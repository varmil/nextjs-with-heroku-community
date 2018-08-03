const jwt = require('jwt-simple')
const reqlib = require('app-root-path').require
const services = require('../services')
const models = require('../models')
const Message = require('../constants/Message')
const { secret } = require('../config/server')
const Rule = reqlib('/../shared/constants/Rule')

const E_EMAIL_PASSWORD = {
  error: 'メールアドレスとパスワードを正しく入力してください。'
}

const E_EMAIL_TAKEN = {
  error:
    'このメールアドレスはすでに利用されています。別のメールアドレスをご利用ください。'
}

const E_INVALID_CODE = {
  error: 'この招待コードは不正です。間違いがないか再度ご確認ください。'
}

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, secret)
}

exports.signin = function(req, res) {
  res.json({ token: tokenForUser(req.user) })
}

exports.signup = async function(req, res, next) {
  console.log('[profile]body', req.body)
  console.log('[profile]file', req.file)
  // bodyにこのkeyがあれば「新しいブランドの１人目の管理者」として登録
  const isFirstAdmin = req.body.isAdmin === 'true'

  // 必須チェック
  const { email, password, code } = req.body
  if (!email || !password || password.length < Rule.PASS_MIN_LENGTH) {
    return res.status(422).json(E_EMAIL_PASSWORD)
  }

  // 必須チェック（管理者）
  const { brandName, lastName, firstName } = req.body
  if (isFirstAdmin) {
    if (!brandName || !lastName || !firstName) {
      return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
    }
  }

  try {
    // emailが使われていないか
    {
      const existingUser = await models.User.findOne({
        where: { email },
        raw: true
      })
      if (existingUser) {
        return res.status(422).json(E_EMAIL_TAKEN)
      }
    }

    // create first admin record if the user registers from admin signup page
    let user
    if (isFirstAdmin) {
      user = await services.User.createFirstAdmin(
        email,
        password,
        brandName,
        lastName,
        firstName,
        req.file
      )
    } else {
      // code正当性チェック
      const invitation = await models.Invitation.find({
        where: { code },
        raw: true
      })
      if (!invitation) {
        return res.status(422).json(E_INVALID_CODE)
      }
      // 登録
      const { brandId, roleId } = invitation
      user = await services.User.createUser(
        code,
        email,
        password,
        brandId,
        roleId
      )
    }

    console.log('user created ! { id, roleId } : ', user.id, user.roleId)
    res.json({ token: tokenForUser(user) })
  } catch (e) {
    res.status(500).json(Message.E_500_ERROR)
    return next(e)
  }
}

// codeからemail情報を取得する
exports.authInvitationCode = async function(req, res, next) {
  // レコードが存在しない == 招待されてないユーザ
  const code = req.params.code
  const invitation = await models.Invitation.find({
    where: { code },
    raw: true
  })
  if (!invitation) {
    return res.status(422).json(E_INVALID_CODE)
  }
  const { email, roleId } = invitation
  res.json({ email, roleId })
}
