const _ = require('lodash')
const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const BoxType = reqlib('/../shared/constants/BoxType')
const Role = reqlib('/../shared/constants/Role')
const Message = reqlib('/constants/Message')

/**
 * 新規投稿 or 編集（AdminもUserもこれを使用）
 * NOTE: boxTypeやcategoryIndexは文字列なので注意
 */
exports.save = async (req, res, next) => {
  console.log('[save]body', req.body)
  console.log('[save]file', req.files)
  const { title, body, released, postId, fromServerFiles } = req.body
  const boxType = +req.body.boxType
  const categoryIndex = +req.body.categoryIndex
  const userId = req.user.id
  const brand = req.user.brand

  if (boxType === undefined || !title || !body) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  // 通常ユーザがTALK以外へ投稿しようとしたら弾く
  if (req.user.roleId === Role.User.NORMAL && boxType !== BoxType.index.talk) {
    return res.status(403).json(Message.E_NOT_ALLOWED)
  }

  // VOICE
  const { options, deadline } = req.body
  if (boxType === BoxType.index.voice) {
    if (!options || !deadline) {
      return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
    }
  }

  const trans = await models.sequelize.transaction()
  try {
    // 投稿をpostテーブルへ保存
    const savedPostId = await services.Post.save(
      // UPDATEの場合はpostIdに値が何かしら入っている
      postId,
      userId,
      brand.id,
      boxType,
      released,
      title,
      body,
      categoryIndex,
      req.files,
      fromServerFiles,
      trans
    )

    // boxTypeによって、送信項目が異なるのでメソッドも変更
    switch (boxType) {
      // アンケート
      case BoxType.index.voice:
        await services.Post.saveVoice(savedPostId, options, deadline, trans)
        break
      // 追加項目なし
      case BoxType.index.talk:
      case BoxType.index.news:
        break
      default:
        console.warn('boxType not match, so treat as basic post', boxType)
    }

    await trans.commit()
    res.json({ id: savedPostId })
  } catch (e) {
    await trans.rollback()
    return next(e)
  }
}

/**
 * 記事削除
 */
exports.delete = async (req, res, next) => {
  const { id } = req.query

  if (!id) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  const post = await models.Post.findById(id, { raw: true })
  if (!post) {
    return res.status(404).json(Message.E_NOT_FOUND)
  }

  // 通常ユーザが自分の投稿以外を削除しようとしていたら弾く
  if (req.user.roleId < Role.User.ADMIN_GUEST && +id !== post.posterId) {
    return res.status(403).json(Message.E_NOT_ALLOWED)
  }

  const trans = await models.sequelize.transaction()
  try {
    // NOTE: 記事とそれに紐づくコメントを削除
    // PostLikeなど他の関連テーブルも削除しないと本来ダメだが、
    // 膨大な量のテーブルがあるので必要最低限のテーブルのみ操作
    const p1 = models.Post.destroy({ where: { id } }, { trans })
    const p2 = models.Comment.destroy({ where: { postId: id } }, { trans })
    const p3 = models.MroongaPost.destroy({ where: { postId: id } })
    await Promise.all([p1, p2, p3])
    await trans.commit()
    res.json(true)
  } catch (e) {
    await trans.rollback()
    return next(e)
  }
}

/**
 * 投票
 */
exports.saveVote = async (req, res, next) => {
  console.log('[saveVote]body', req.body)
  const { postId, choiceIndex, comment } = req.body
  if (!postId || _.isUndefined(choiceIndex)) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }
  const voterId = req.user.id
  const isFirstVote = await services.Post.saveVote(
    postId,
    voterId,
    req.user.brand.id,
    choiceIndex,
    comment
  )
  res.json({ isFirstVote })
}

/**
 * LIKE
 */
exports.saveLike = async (req, res, next) => {
  console.log('[saveLike]body', req.body)
  const { postId, upOrDown } = req.body
  if (!postId || _.isUndefined(upOrDown)) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }
  const userId = req.user.id
  const brandId = req.user.brand.id
  const success = await services.Post.saveLike(
    postId,
    userId,
    brandId,
    upOrDown
  )
  res.json(success)
}

/**
 * 個別記事 取得
 */
exports.fetch = async (req, res, next) => {
  try {
    const { postId } = req.params
    if (!postId) return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)

    // fetchListを流用（楽なので）
    const where = { id: postId }
    const posts = await services.Post.fetchList(1, where, {
      assoc: true,
      userId: req.user.id
    })
    let result = posts[0]

    if (result.boxType === BoxType.index.voice) {
      // 自分の投票を取得
      const voterId = req.user.id || 0
      const choiceIndex = await services.Post.fetchVote(postId, voterId)
      result = { ...result, Voice: { ...result.Voice, choiceIndex } }

      // それぞれの得票数割合を計算
      // [ { choiceIndex, percentage, count }, ... ]
      const percentages = await services.Post.fetchPercentageOfVotes(postId)
      result = { ...result, Voice: { ...result.Voice, percentages } }
    }

    res.json(result)
  } catch (e) {
    return next(e)
  }
}

/**
 * 主にAdmin用。brandIdにひもづく記事をカウント
 */
exports.countAll = async (req, res) => {
  const brandId = req.user.brand.id
  const count = await models.Post.count({ where: { brandId }, raw: true })
  res.json(count)
}

/**
 * 主にAdmin用。brandIdにひもづく記事をまとめて取得
 */
exports.fetchList = async (req, res) => {
  const { perPage } = req.query
  const pageNum = req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id

  // 記事データ
  const posts = await services.Post.fetchList(pageNum, { brandId }, { perPage })
  // 総カウント
  const count = await models.Post.count({ where: { brandId }, raw: true })
  res.json({ count, item: posts })
}

/**
 * 主にUser用。各BOXで表示する記事一覧取得
 */
exports.fetchListOfBox = async (req, res) => {
  if (!req.params.boxType) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  const { perPage, categoryIndex } = req.query
  const boxType = +req.params.boxType
  const pageNum = +req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id

  // where条件
  let where = { brandId, boxType, released: true }
  if (!_.isNil(categoryIndex) && _.isNumber(+categoryIndex)) {
    where = { ...where, categoryIndex: +categoryIndex }
  }

  const posts = await services.Post.fetchList(pageNum, where, {
    perPage,
    assoc: true,
    userId: req.user.id
  })
  res.json(posts)
}

/**
 * Mypageで表示する記事一覧取得（特定ユーザに関連するPOST一覧取得）
 */
exports.fetchListOfUser = async (req, res) => {
  const { perPage, userId } = req.query
  const { id, brand } = req.user
  const pageNum = +req.params.pageNum || 1 // 1 origin

  // 指定がなければ自分のPOST
  const fetchingUserId = +userId || id
  let where = { posterId: fetchingUserId, brandId: brand.id, released: true }
  const posts = await services.Post.fetchList(pageNum, where, {
    perPage,
    assoc: true,
    userId: fetchingUserId
  })
  res.json(posts)
}

/**
 * オートコンプリート用。検索中に表示する候補一覧取得
 */
exports.fetchTypeahead = async (req, res) => {
  res.json(true)
}

/**
 * 検索結果画面で表示する記事一覧取得
 */
exports.fetchSearched = async (req, res) => {
  const { perPage, onlyPhoto } = req.query
  const { id, brand } = req.user
  const pageNum = +req.params.pageNum || 1 // 1 origin
  const word = req.params.word
  console.info('sended word is', word)

  let where = { brandId: brand.id, released: true }

  // onlyPhotoの場合は、画像があるPOSTのみ取得
  if (onlyPhoto) {
    where = {
      ...where,
      images: { [models.Sequelize.Op.notLike]: [] }
    }
  }

  // wordが ハッシュタグ : ハッシュタグ完全一致のみ検索
  //        ハッシュタグ以外 : mroongaからFETCH
  if (word.startsWith('#')) {
    const tag = word.replace('#', '')
    const postIds = await services.Hashtag.fetchPostIds(tag)
    const commentIds = await services.Hashtag.fetchCommentIds(tag)
    const commentPostIds = await services.Comment.fetchPostIds(commentIds)
    const targetPostIds = _.uniq([...postIds, ...commentPostIds])
    where = { id: targetPostIds, ...where }
  } else {
    const postIds = await models.MroongaPost.findPostIds(word)
    where = { id: postIds, ...where }
    // console.info('＃＃＃＃＃＃mroonga検索＃＃＃＃＃＃', postIds)
  }

  let result = await services.Post.fetchList(pageNum, where, {
    perPage,
    assoc: true,
    userId: id
  })

  // PHOTOデータのみ返す場合
  if (onlyPhoto) {
    result = _.chain(result)
      .flatMap(row => {
        const { id, boxType } = row
        return _.map(row.images, (photo, index) => ({
          id,
          boxType,
          photo,
          index
        }))
      })
      .value()
    // console.log('#####result #####', result)
  }

  res.json(result)
}
