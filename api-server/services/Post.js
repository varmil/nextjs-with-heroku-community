const reqlib = require('app-root-path').require
const _ = require('lodash')
const UserService = reqlib('/services/User')
const BadgeService = reqlib('/services/Badge')
const CommentService = reqlib('/services/Comment')
const HashtagService = reqlib('/services/Hashtag')
const NotificationService = reqlib('/services/Notification')
const { moveImage, moveImages } = reqlib('/utils/image')
const models = reqlib('/models')
const Path = reqlib('/constants/Path')
const Role = reqlib('/../shared/constants/Role')
const Rule = reqlib('/../shared/constants/Rule')
const BoxType = reqlib('/../shared/constants/BoxType')
const { BadgeType } = reqlib('/../shared/constants/Badge')
const sanitizer = reqlib('/utils/sanitizer')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20

module.exports = class Post {
  static async save(
    postId,
    userId,
    brandId,
    boxType,
    released,
    title,
    body,
    categoryIndex,
    files,
    fromServerFiles,
    transaction
  ) {
    try {
      let data = {
        brandId,
        boxType,
        released,
        posterId: userId,
        title: sanitizer.html(title),
        body: sanitizer.html(body)
      }
      // optional params
      if (categoryIndex) {
        data = { ...data, categoryIndex }
      }

      // save images if needed (union)
      {
        const newImages = await moveImages(files, Path.POST_IMG_DIR)
        data = { ...data, images: _.union(fromServerFiles, newImages) }
        if (!_.isEmpty(newImages)) {
          await BadgeService.incrementValue(userId, brandId, BadgeType.PHOTO, {
            transaction
          })
        }
      }

      // Postテーブルへの変更
      if (postId) {
        await models.Post.update(
          data,
          { where: { id: postId } },
          { transaction }
        )
      } else {
        // INSERT, 変数再代入が微妙か
        const post = await models.Post.create(data, { transaction })
        postId = post.id
        // badge
        await BadgeService.incrementValue(userId, brandId, BadgeType.POST, {
          transaction
        })
      }

      // Hashtagsテーブル更新。各々のタグに関して新規:INSERT。既存:find tagId
      const hashtags = HashtagService.findTagsFrom(body)
      {
        const hashtagIds = await HashtagService.upsert(hashtags, transaction)
        await Post.updatePostHashtagRelation(postId, hashtagIds, transaction)
      }

      // mroongaへ同期（完了を待つ必要なし）
      {
        const { title, body } = data
        const tags = hashtags.join(' ')
        models.MroongaPost.upsert({ postId, title, body, tags })
      }

      return postId
    } catch (e) {
      console.error(e)
    }
  }

  // VOICEへ投稿したとき（管理者が）
  static async saveVoice(postId, options, deadline, trans) {
    try {
      const created = await models.Voice.upsert(
        {
          postId,
          options,
          deadline
        },
        {
          transaction: trans
        }
      )
      return created
    } catch (e) {
      console.error(e)
    }
  }

  static async fetchList(pageNum, where, options = {}) {
    // optionsを展開
    let { perPage, userId, assoc } = options
    perPage = +perPage || DEFAULT_PER_PAGE

    // 特殊カテゴリ（すべて）の対処
    if (
      !_.isNil(where.categoryIndex) &&
      +where.categoryIndex === Rule.ALL_CATEGORY_INDEX
    ) {
      delete where.categoryIndex
    }

    // 特定条件なら関連テーブルも引っ張る
    let include = []
    if (assoc || where.boxType === BoxType.index.voice) {
      include.push({
        model: models.Voice,
        attributes: ['options', 'deadline', 'count']
      })
    }
    if (assoc && userId) {
      // 自分がそのPostにLike済みか PostLike: [] or [{ upOrDown: true or false }]
      include.push({
        model: models.PostLike,
        attributes: ['upOrDown'],
        where: { userId },
        required: false
      })
    }

    try {
      const posts = await models.Post.findAll({
        where: where,
        limit: perPage,
        offset: perPage * (pageNum - 1),
        order: [['id', 'DESC']],
        include
      })
      const plainPosts = posts.map(e => e.get({ plain: true }))
      return await Post.associateWithUser(plainPosts)
    } catch (e) {
      console.error(e)
    }
  }

  // 投票（UPDATE対応済）
  static async saveVote(postId, voterId, brandId, choiceIndex, comment) {
    // 初投票ならtrue, 更新ならfalse
    let isFirstVote = false
    const transaction = await models.sequelize.transaction()
    try {
      const log = await models.VoiceLog.findOne({
        where: { postId, voterId }
      })
      if (log) {
        // 投票済みなのでカウントは増やさない
        await log.update({ choiceIndex })
      } else {
        // INSERT and count up sum table
        isFirstVote = true

        // insert comment if exist, nested transaction
        // NOTE: ネストしたトランザクションになるけど大丈夫か？
        let commentId = 0
        if (comment) {
          const created = await CommentService.save(
            postId,
            voterId,
            brandId,
            comment
          )
          commentId = created.id
        }

        // insert log
        await models.VoiceLog.create(
          {
            postId,
            voterId,
            choiceIndex,
            commentId
          },
          { transaction }
        )

        // count up vote count
        await models.Voice.update(
          { count: models.sequelize.literal('count + 1') },
          { where: { postId } },
          { transaction }
        )

        // badge
        await BadgeService.incrementValue(voterId, brandId, BadgeType.SURVEY, {
          transaction
        })
      }

      await transaction.commit()
      return isFirstVote
    } catch (e) {
      await transaction.rollback()
      console.error(e)
      return false
    }
  }

  // Like（UPDATE対応済）
  static async saveLike(postId, userId, brandId, upOrDown) {
    const transaction = await models.sequelize.transaction()
    try {
      const created = await models.PostLike.upsert(
        {
          postId,
          userId,
          upOrDown
        },
        { transaction }
      )

      // increment if up
      let query = upOrDown ? '`like` + 1' : '`like` - 1'
      await models.Post.update(
        { like: models.sequelize.literal(query) },
        { where: { id: postId } },
        { transaction }
      )

      // 初回LIKE時
      if (created) {
        // update Notification table (not wait the operation)
        await NotificationService.save(
          Rule.NOTIFICATION_TYPE.Like,
          postId,
          userId,
          brandId,
          { transaction }
        )

        await BadgeService.incrementValue(userId, brandId, BadgeType.LIKE, {
          transaction
        })
      }

      await transaction.commit()
      return true
    } catch (e) {
      await transaction.rollback()
      console.error(e)
      return false
    }
  }

  // 特定のユーザの投票結果（choiceIndex）を取得
  static async fetchVote(postId, voterId) {
    try {
      const row = await models.VoiceLog.findOne({
        attributes: ['choiceIndex'],
        where: { postId, voterId },
        raw: true
      })

      if (!row) return null

      console.log(
        `choiceIndex of post:${postId}, voter:${voterId}, i:${row.choiceIndex}`
      )
      return row.choiceIndex
    } catch (e) {
      console.error(e)
    }
  }

  // Optionごとの得票割合を取得 (choiceInde)
  // return : [ 60, 32, 8 ]
  static async fetchPercentageOfVotes(postId) {
    try {
      let choiceCounts = await models.VoiceLog.findAll({
        attributes: ['choiceIndex', Post.getCountAttr()],
        where: { postId },
        group: 'choiceIndex',
        order: [['choiceIndex', 'ASC']],
        raw: true
      })
      if (_.isEmpty(choiceCounts)) return []

      const countSum = _.sumBy(choiceCounts, 'count')
      const mostPopularOption = _.maxBy(choiceCounts, 'count').choiceIndex
      return _.map(choiceCounts, e => {
        const isMostPopular = e.choiceIndex === mostPopularOption
        return {
          ...e,
          percentage: Math.ceil((e.count / countSum) * 100),
          isMostPopular
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  // NOTE: mutate original posts
  // postIdsをもとに表示するのに必要なユーザ情報を追加
  static async associateWithUser(posts) {
    const names = await UserService.fetchAllObj(_.map(posts, 'posterId'))
    const merged = posts.map(p => {
      const { name, iconPath } = names[p.posterId]
      return { ...p, name, iconPath }
    })
    return merged
  }

  // sequelizeで count クエリを発行するための関数
  static getCountAttr() {
    return [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']
  }

  static async updatePostHashtagRelation(postId, hashtagIds, transaction) {
    // まず既存のタグ関係を削除
    await models.PostHashtag.destroy({ where: { postId } }, { transaction })
    // その後INSERT
    const data = hashtagIds.map(hashtagId => {
      return {
        postId,
        hashtagId
      }
    })
    await models.PostHashtag.bulkCreate(data, { transaction })
  }
}
