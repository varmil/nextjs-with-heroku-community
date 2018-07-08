const _ = require('lodash')
const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const BoxType = reqlib('/../shared/constants/BoxType')
const Role = reqlib('/constants/Role')
const Message = reqlib('/constants/Message')

/**
 * 新規コメント
 */
exports.save = async (req, res, next) => {
  console.log('[profile]body', req.body)
  const { postId, body } = req.body
  const userId = req.user.id

  if (!postId || !body) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    const comment = await models.Comment.create({
      postId,
      commenterId: userId,
      body
    })
    const merged = (await services.Comment.associateWithUser([
      comment.dataValues
    ]))[0]
    res.json(merged)
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

  const data = await services.Comment.fetchList(pageNum, { postId })
  res.json(data)
}
