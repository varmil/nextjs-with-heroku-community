const passport = require('passport')
const services = require('../services')
const models = require('../models')
// const User = require('../models/User')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
const { secret } = require('../config/server')

// setting local strategy:
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, async function(
  email,
  password,
  done
) {
  try {
    const user = await models.User.findOne({ where: { email: email } })
    if (!user) {
      return done(null, false)
    }
    const isMatch = await user.comparePasswords(password)
    if (!isMatch) return done(null, false)
    return done(null, user)
  } catch (e) {
    return done(e)
  }
})

// setting the jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
}

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await models.User.findById(payload.sub.id, { raw: true })

    if (user) {
      const { id, lastLoginedAt } = user
      // ユーザが所属するブランド情報
      const brand = await services.User.fetchBrand(id)
      // 必要なら最終ログイン日時を更新
      await services.User.updateLastLoginedAtIfNeeded(id, lastLoginedAt)

      done(null, { ...user, brand })
    } else {
      done(null, false)
    }
  } catch (e) {
    done(e, false)
  }
})

// tell passport to use defined strategies:
passport.use(jwtLogin)
passport.use(localLogin)
