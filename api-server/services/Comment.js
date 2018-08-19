const reqlib = require('app-root-path').require
const _ = require('lodash')
const UserService = reqlib('/services/User')
const BadgeService = reqlib('/services/Badge')
const HashtagService = reqlib('/services/Hashtag')
const NotificationService = reqlib('/services/Notification')
const MentionService = reqlib('/services/Mention')
const models = reqlib('/models')
const Path = reqlib('/constants/Path')
const { BadgeType } = reqlib('/../shared/constants/Badge')
const Rule = reqlib('/../shared/constants/Rule')
const sanitizer = reqlib('/utils/sanitizer')

const DEFAULT_PER_PAGE = 6

module.exports = class Comment {
  static async save(postId, userId, brandId, body) {
    const transaction = await models.sequelize.transaction()
    try {
      const comment = await models.Comment.create(
        {
          postId,
          commenterId: userId,
          body: sanitizer.html(body)
        },
        { transaction }
      )

      await models.Post.update(
        { comment: models.sequelize.literal('comment + 1') },
        { where: { id: postId } },
        { transaction }
      )

      // commentの中身から使われているhashtagを取得
      const hashtags = HashtagService.findTagsFrom(body)
      {
        const hashtagIds = await HashtagService.upsert(hashtags, transaction)
        await Comment.updateCommentHashtagRelation(
          comment.id,
          hashtagIds,
          transaction
        )
      }

      // mentionの処理
      const mentions = MentionService.regex(body)
      if (mentions) {
        const notificationBase = {
          type: Rule.NOTIFICATION_TYPE.Mention,
          postId,
          targetUserId: null,
          actionUserId: userId,
          brandId
        }
        await MentionService.sendNotifications(
          _.uniq(mentions),
          notificationBase,
          { transaction }
        )
      }

      // update Notification table
      const targetUserId = await models.Post.findById(postId).posterId
      await NotificationService.save(
        Rule.NOTIFICATION_TYPE.Comment,
        { postId, actionUserId: userId, targetUserId, brandId },
        { transaction }
      )

      // badge
      await BadgeService.incrementValue(userId, brandId, BadgeType.COMMENT, {
        transaction
      })

      await transaction.commit()
      const merged = (await Comment.associateWithUser([comment.dataValues]))[0]
      return merged
    } catch (e) {
      await transaction.rollback()
      console.error(e)
    }
  }

  static async fetchList(pageNum, where, options = {}) {
    // optionsを展開
    let { perPage, initialOffset } = options
    perPage = +perPage || DEFAULT_PER_PAGE
    initialOffset = +initialOffset || 0

    try {
      const offset = pageNum <= 1 ? 0 : perPage * (pageNum - 2) + initialOffset
      const comments = await models.Comment.findAll({
        where: where,
        limit: perPage,
        offset,
        order: [['id', 'DESC']],
        raw: true
      })
      const merged = await Comment.associateWithUser(comments)
      return merged
    } catch (e) {
      console.error(e)
    }
  }

  // 初回フェッチ用
  static async fetchListOfVoice(pageNum, where, options = {}) {
    // optionsを展開
    let { perPage, initialOffset, index } = options

    if (_.isNil(index)) {
      console.error('[fetchListOfVoice] index is must exist !')
      return null
    }

    perPage = +perPage || DEFAULT_PER_PAGE
    initialOffset = +initialOffset || 0

    try {
      // まずVoiceLogから各OptionごとのコメントIDを取得
      const offset = pageNum <= 1 ? 0 : perPage * (pageNum - 2) + initialOffset
      const rows = await models.VoiceLog.findAll({
        where: { ...where, choiceIndex: +index },
        limit: perPage,
        offset,
        order: [['id', 'DESC']],
        raw: true
      })

      // その後、コメントIDからコメント本文を取得
      const commentIds = _.map(rows, 'commentId')
      const comments = await models.Comment.findAll({
        where: { id: commentIds },
        order: [['id', 'DESC']],
        raw: true
      })
      const merged = await Comment.associateWithUser(comments)

      console.log('###########merged', merged)
      return merged
    } catch (e) {
      console.error(e)
    }
  }

  // NOTE: mutate original comments
  // postIdsをもとに表示するのに必要なユーザ情報を追加
  static async associateWithUser(comments) {
    const names = await UserService.fetchAllObj(_.map(comments, 'commenterId'))
    const merged = comments.map(c => {
      const { name, iconPath } = names[c.commenterId]
      return { ...c, name, iconPath }
    })
    return merged
  }

  static async updateCommentHashtagRelation(
    commentId,
    hashtagIds,
    transaction
  ) {
    const data = hashtagIds.map(hashtagId => {
      return {
        commentId,
        hashtagId
      }
    })
    await models.CommentHashtag.bulkCreate(data, { transaction })
  }

  static async fetchPostIds(commentIds) {
    const comments = await models.Comment.findAll({
      where: { id: commentIds },
      raw: true
    })

    return _.uniq(_.map(comments, 'postId'))
  }
}
