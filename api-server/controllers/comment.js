const _ = require('lodash')
const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const BoxType = reqlib('/../shared/constants/BoxType')
const Role = reqlib('/../shared/constants/Role')
const Message = reqlib('/constants/Message')

/**
 * 新規コメント
 */
exports.save = async (req, res, next) => {
  console.log('[saveComment]body', req.body)
  const { postId, body } = req.body
  const userId = req.user.id
  const brandId = req.user.brand.id

  if (!postId || !body) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    const result = await services.Comment.save(postId, userId, brandId, body)
    res.json(result)
  } catch (e) {
    return next(e)
  }
}

/**
 * 削除
 */
exports.delete = async (req, res, next) => {
  const { id } = req.query

  if (!id) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  const comment = await models.Comment.findById(id, { raw: true })
  if (!comment) {
    return res.status(404).json(Message.E_NOT_FOUND)
  }

  // 通常ユーザが自分のコメント以外を削除しようとしていたら弾く
  if (req.user.roleId < Role.User.ADMIN_GUEST && +id !== comment.commenterId) {
    return res.status(403).json(Message.E_NOT_ALLOWED)
  }

  try {
    await models.Comment.destroy({ where: { id } })
    res.json(true)
  } catch (e) {
    return next(e)
  }
}

/**
 * まとめて 取得
 */
exports.fetchList = async (req, res) => {
  const postId = +req.params.postId
  const pageNum = +req.params.pageNum || 1 // 1 origin

  if (!postId) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  // 最初に表示されてる件数とページングの件数は必ずしも一致しない
  let { perPage, initialOffset } = req.query
  perPage = pageNum === 1 ? initialOffset : perPage

  // 各種オプション
  let { index } = req.query

  // boxTypeごとに返却するデータが異なるのでまずfetch
  const boxType = (await models.Post.findById(postId)).boxType

  let fetchFunc = null
  switch (boxType) {
    case BoxType.index.voice:
      fetchFunc = services.Comment.fetchListOfVoice
      break
    default:
      fetchFunc = services.Comment.fetchList
  }
  const data = await fetchFunc(
    pageNum,
    { postId },
    { perPage, initialOffset, index }
  )
  res.json(data)
}
