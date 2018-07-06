const services = require('../services')
const models = require('../models')
const Role = require('../constants/Role')
// const User = require('../models/User')
const jwt = require('jwt-simple')
const { secret } = require('../config/server')

const E_EMAIL_PASSWORD = {
  error: 'メールアドレスとパスワードを正しく入力してください。'
}

const E_NULL_REQUIRED_FIELD = {
  error: '必須項目を正しく入力してください。'
}

const E_EMAIL_TAKEN = {
  error:
    'このメールアドレスはすでに利用されています。別のメールアドレスをご利用ください。'
}

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: { id: user.id }, iat: timestamp }, secret)
}

exports.signin = function(req, res) {
  res.json({ token: tokenForUser(req.user) })
}

exports.signup = async function(req, res, next) {
  console.log('[profile]body', req.body)
  console.log('[profile]file', req.file)
  // bodyにこのkeyがなければ「ユーザ」として登録（非管理者）
  const isAdmin = req.body.isAdmin === 'true'

  // 必須チェック
  const { email, password } = req.body
  if (!email || !password || password.length < 8) {
    return res.status(422).json(E_EMAIL_PASSWORD)
  }

  // 必須チェック（管理者）
  const { brandName, lastName, firstName } = req.body
  if (isAdmin) {
    if (!brandName || !lastName || !firstName) {
      return res.status(422).json(E_NULL_REQUIRED_FIELD)
    }
  }

  const trans = await models.sequelize.transaction()
  try {
    const existingUser = await models.User.findOne({
      where: { email: email },
      raw: true
    })
    if (existingUser) {
      return res.status(422).json(E_EMAIL_TAKEN)
    }

    const user = await models.User.create(
      {
        email: email,
        passwordHash: await models.User.generateHash(password),
        roleId: isAdmin ? Role.User.ADMIN_SUPER : Role.User.NORMAL
      },
      {
        transaction: trans
      }
    )

    // create admin record if the user is admin
    if (user.roleId >= Role.User.ADMIN_GUEST) {
      const result = await services.User.createAdmin(
        trans,
        user.id,
        brandName,
        lastName,
        firstName,
        req.file
      )
    }

    trans.commit()
    console.log('user created ! { id, roleId } : ', user.id, user.roleId)
    res.json({ token: tokenForUser(user) })
  } catch (e) {
    trans.rollback()
    return next(e)
  }
}
