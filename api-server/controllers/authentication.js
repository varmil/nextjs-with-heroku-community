const models = require('../models')
// const User = require('../models/User')
const jwt = require('jwt-simple')
const { secret } = require('../config/server')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode(
    { sub: { id: user.id, nickname: user.nickname }, iat: timestamp },
    secret
  )
}

exports.signin = function(req, res) {
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = async function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'Email and password must be provided' })
  }

  try {
    const existingUser = await models.User.findOne({
      where: { email: email },
      raw: true
    })
    if (existingUser) {
      return res.status(422).send({ error: 'Email is aleready in use...' })
    }

    const user = await models.User.create({
      email: email,
      passwordHash: await models.User.generateHash(password)
    })

    console.log('user created ! his id is ', user.id)
    res.json({ token: tokenForUser(user) })
  } catch (e) {
    return next(e)
  }
}
