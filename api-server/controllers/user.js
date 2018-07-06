const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
// const moveFile = require('move-file')
// const Path = reqlib('/constants/Path')

/**
 * Profile編集
 */
exports.profile = async (req, res, next) => {
  const { userId, nickname } = req.body

  if (!userId || !nickname) {
    return res.status(422).json({ error: '項目を正しく入力してください。' })
  }

  try {
    await services.User.updateProfile(userId, nickname, req.file)
    res.json(true)
  } catch (e) {
    return next(e)
  }
}
