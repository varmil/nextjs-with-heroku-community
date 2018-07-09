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
  const { title, body, fromServerFiles } = req.body
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
    const released = true
    const post = await services.Post.save(
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
        await services.Post.saveVoice(post.id, options, deadline, trans)
        break
      // 追加項目なし
      case BoxType.index.talk:
      case BoxType.index.news:
        break
      default:
        console.warn('boxType not match, so treat as basic post', boxType)
    }

    trans.commit()
    res.json({ id: post.id })
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

exports.fetchList = async (req, res) => {
  const pageNum = req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id
  const posts = await services.Post.fetchList(pageNum, { brandId })
  // console.log('###############', posts)
  res.json(posts)
}

exports.fetchListOfBox = async (req, res) => {
  const { boxType } = req.params
  const pageNum = req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id

  if (!boxType) return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)

  const posts = await services.Post.fetchList(pageNum, { brandId, boxType })
  res.json(posts)
}
