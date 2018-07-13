const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const Message = reqlib('/constants/Message')

/**
 * Profile編集
 */
exports.profile = async (req, res, next) => {
  console.log('[profilesave]body', req.body)
  console.log('[profilesave]file', req.files)
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

/**
 * 最終ログイン日時を更新
 */
exports.updateLoginedAt = async (req, res, next) => {
  const { userId, lastLoginedAt } = req.user

  try {
    // 待たなくていいのでawaitしない
    services.User.updateLastLoginedAtIfNeeded(userId, lastLoginedAt)
    res.json(true)
  } catch (e) {
    return next(e)
  }
}

exports.fetchInBrand = async (req, res, next) => {
  const { perPage } = req.query
  const pageNum = req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id

  // 記事データ
  const users = await services.User.fetchList(pageNum, { brandId }, { perPage })
  // 総カウント
  const count = await models.UserBrand.count({ where: { brandId }, raw: true })
  res.json({ count, item: users })
}
