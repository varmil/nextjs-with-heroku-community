const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const Message = reqlib('/constants/Message')
const Role = reqlib('/../shared/constants/Role')

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

/**
 * 特定ブランドに紐づくユーザ一覧（ファン一覧取得などに使う）
 */
exports.fetchInBrand = async (req, res, next) => {
  const { perPage } = req.query
  const pageNum = req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id

  const users = await services.User.fetchList(pageNum, { brandId }, { perPage })
  const count = await models.UserBrand.count({ where: { brandId }, raw: true })
  res.json({ count, item: users })
}

/**
 * 招待ファン一覧取得
 */
exports.fetchInvitedFans = async (req, res, next) => {
  const { perPage } = req.query
  const pageNum = req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id

  const invitedFans = await services.Invitation.fetchList(
    pageNum,
    { brandId },
    { perPage }
  )
  const count = await models.Invitation.count({ where: { brandId }, raw: true })
  res.json({ count, item: invitedFans })
}

/**
 * 招待発行
 */
exports.saveInvitation = async (req, res, next) => {
  console.log('[profilesave]body', req.body)
  const { emails, roleId } = req.body
  const brandId = req.user.brand.id

  if (!emails) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  // 複数人追加するときのデフォルト権限（管理者専用）
  let defaultRole
  if (!roleId) {
    defaultRole = roleId
  }

  try {
    await services.Invitation.save(brandId, emails, defaultRole)
    res.json(true)
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(500).json('そのメールアドレスは既に招待済みです。')
    } else {
      return res.status(500).json(e.name)
    }
  }
}
