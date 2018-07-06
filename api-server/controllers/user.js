const reqlib = require('app-root-path').require
const services = reqlib('/services')
const Message = reqlib('/constants/Message')

/**
 * Profile編集
 */
exports.profile = async (req, res, next) => {
  const { userId, nickname } = req.body

  if (!userId || !nickname) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    await services.User.updateProfile(userId, nickname, req.file)
    res.json(true)
  } catch (e) {
    return next(e)
  }
}
