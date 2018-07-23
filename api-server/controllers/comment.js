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

  if (!postId || !body) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    const result = await services.Comment.save(postId, userId, body)
    res.json(result)
  } catch (e) {
    return next(e)
  }
}

/**
 * まとめて 取得
 */
exports.fetchList = async (req, res) => {
  const postId = req.params.postId
  const pageNum = req.params.pageNum || 1 // 1 origin

  if (!postId) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  // boxTypeごとに返却するデータが異なるのでまずfetch
  const boxType = (await models.Post.findById(postId)).boxType

  let data = null
  switch (boxType) {
    case BoxType.index.voice:
      data = await services.Comment.fetchListOfVoice(pageNum, { postId })
      break
    default:
      data = await services.Comment.fetchList(pageNum, { postId })
  }

  res.json(data)
}
