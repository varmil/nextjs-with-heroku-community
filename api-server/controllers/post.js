const _ = require('lodash')
const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const BoxType = reqlib('/../shared/constants/BoxType')
const Role = reqlib('/constants/Role')
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
    return res.status(422).json(Message.E_NOT_ALLOWED)
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

    trans.commit()
    res.json({ id: savedPostId })
  } catch (e) {
    trans.rollback()
    return next(e)
  }
}

/**
 * 投票
 */
exports.saveVote = async (req, res, next) => {
  console.log('[saveVote]body', req.body)
  const { postId, choiceIndex } = req.body
  if (!postId || _.isUndefined(choiceIndex)) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }
  const voterId = req.user.id
  const isFirstVote = await services.Post.saveVote(postId, voterId, choiceIndex)
  res.json({ isFirstVote })
}

/**
 * 個別記事 取得
 */
exports.fetch = async (req, res) => {
  const { postId } = req.params
  if (!postId) return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)

  let result = {}
  const post = await models.Post.findById(postId, {
    raw: true
  })
  result = (await services.Post.associateWithUser([post]))[0]

  // boxTypeによって追加取得
  if (post.boxType === BoxType.index.voice) {
    // hasOneで取得するときと同様パスカルで。
    const Voice = await models.Voice.findOne({
      attributes: ['options', 'deadline', 'count'],
      where: { postId: post.id },
      raw: true
    })
    // 自分の投票を取得
    const voterId = req.user.id || 0
    const choiceIndex = await services.Post.fetchVote(post.id, voterId)
    result = { ...result, Voice: { ...Voice, choiceIndex } }
  }

  res.json(result)
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

exports.fetchListOfBox = async (req, res) => {
  if (!req.params.boxType) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  const { perPage, released } = req.query
  const boxType = +req.params.boxType
  const pageNum = +req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id

  let where = { brandId, boxType }
  where = released ? { ...where, released: true } : where
  const posts = await services.Post.fetchList(pageNum, where, { perPage })
  res.json(posts)
}
