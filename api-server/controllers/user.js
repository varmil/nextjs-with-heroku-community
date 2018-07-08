const reqlib = require('app-root-path').require
const services = reqlib('/services')
const Message = reqlib('/constants/Message')

/**
 * Profile編集
 */
exports.profile = async (req, res, next) => {
  const { nickname, fromServerFiles } = req.body
  const userId = req.user.id

  if (!nickname) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    await services.User.updateProfile(
      userId,
      nickname,
      req.file,
      fromServerFiles
    )
    res.json(true)
  } catch (e) {
    return next(e)
  }
}
