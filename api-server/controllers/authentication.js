const models = require('../models')
const Role = require('../constants/Role')
// const User = require('../models/User')
const jwt = require('jwt-simple')
const { secret } = require('../config/server')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: { id: user.id }, iat: timestamp }, secret)
}

exports.signin = function(req, res) {
  res.json({ token: tokenForUser(req.user) })
}

exports.signup = async function(req, res, next) {
  const email = req.body.email
  const password = req.body.password
  // bodyにこのkeyがなければ「ユーザ」として登録（非管理者）
  const isAdmin = req.body.isAdmin === 'true'

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: 'Email and password must be provided' })
  }

  const trans = await models.sequelize.transaction()
  try {
    const existingUser = await models.User.findOne({
      where: { email: email },
      raw: true
    })
    if (existingUser) {
      return res.status(422).json({ error: 'Email is aleready in use...' })
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
      await models.Admin.create(
        {
          userId: user.id
        },
        {
          transaction: trans
        }
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
