const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const Message = reqlib('/constants/Message')
// const services = reqlib('/services')
// const BoxType = reqlib('/../shared/constants/BoxType')
// const Role = reqlib('/../shared/constants/Role')
// const Path = reqlib('/constants/Path')
// const { moveImages } = reqlib('/utils/image')

/**
 * お問い合わせ送信
 */
exports.save = async (req, res, next) => {
  const userId = req.user.id
  const brandId = req.user.brand.id
  const { type, text } = req.body

  if (!type && !text) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    await models.Contact.create({
      type,
      brandId,
      userId,
      text
    })
    res.json(true)
  } catch (e) {
    return next(e)
  }
}
