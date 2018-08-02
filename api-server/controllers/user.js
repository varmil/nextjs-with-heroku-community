const _ = require('lodash')
const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const Message = reqlib('/constants/Message')
const Role = reqlib('/../shared/constants/Role')
const ConstInvitation = reqlib('/../shared/constants/Invitation')

/**
 * 特定ユーザ情報取得
 */
exports.fetch = async (req, res, next) => {
  const userId = req.params.id
  const user = await models.User.findById(userId, { raw: true })
  const brand = await services.User.fetchBrand(userId)
  let result = _.pick(user, [
    'id',
    'email',
    'nickname',
    'firstName',
    'lastName',
    'iconPath',
    'roleId'
  ])
  result = { ...result, brand }
  res.json(result)
}

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
  const { id, lastLoginedAt } = req.user

  try {
    // 待たなくていいのでawaitしない
    services.User.updateLastLoginedAtIfNeeded(id, lastLoginedAt)
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
    { brandId, roleId: Role.User.NORMAL },
    { perPage }
  )
  const count = await models.Invitation.count({ where: { brandId }, raw: true })
  res.json({ count, item: invitedFans })
}

/**
 * 招待発行
 */
exports.saveInvitation = async (req, res, next) => {
  console.log('[saveInvitation]body', req.body)
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

/**
 * 通知取得
 */
exports.fetchNotifications = async (req, res, next) => {
  const { perPage } = req.query
  const pageNum = req.params.pageNum || 1 // 1 origin

  const where = { userId: req.user.id }
  const data = await services.Notification.fetchList(pageNum, where, {
    perPage
  })
  res.json(data)
}

/**
 * 未読通知数取得
 */
exports.fetchNewNotificationCount = async (req, res, next) => {
  const count = await models.Notification.count({
    where: {
      userId: req.user.id,
      isRead: false
    }
  })
  res.json(count)
}

/**
 * 通知を既読に（待たない）
 */
exports.saveReadNotifications = async (req, res, next) => {
  services.Notification.updateAllRead(req.user.id)
  res.json(true)
}

/**
 * 管理者一覧取得
 */
exports.fetchAdminList = async (req, res, next) => {
  const brandId = req.user.brand.id

  // 登録済み
  const admins = await services.User.fetchAllAdmins(brandId)

  // 招待済み管理者（招待コードがほしいので）。ページングしないので適当に
  const invited = await services.Invitation.fetchList(
    1,
    {
      brandId,
      roleId: {
        [models.Sequelize.Op.gte]: Role.User.ADMIN_GUEST
      },
      status: ConstInvitation.NOT_JOINED
    },
    { perPage: 10000 }
  )

  // 連結してソート
  const sorted = _.orderBy(_.concat(admins, invited), ['createdAt'], ['desc'])
  // console.log('sorted @@@@@@@@@@', sorted)
  res.json({ item: sorted })
}

/**
 * 管理者アカウント追加
 */
exports.saveAdminAdd = async (req, res, next) => {
  console.log('[saveAdminAdd]body', req.body)
  const { email, roleId, isNotified } = req.body
  const brandId = req.user.brand.id

  if (!email || !roleId) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    // ファン招待と同じく招待コードを使う
    await services.Invitation.save(brandId, email, roleId)
    res.json(true)
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(500).json('そのメールアドレスは既に招待済みです。')
    } else {
      return res.status(500).json(e.name)
    }
  }
}
