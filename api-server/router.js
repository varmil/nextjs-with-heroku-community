const express = require('express')
const ConnectRoles = require('connect-roles')
const Role = require('./constants/Role')
const Authentication = require('./controllers/authentication')
const passport = require('passport')
require('./services/passport')

const router = express.Router()

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false })

// ------------------ CONNECT ROLES ---------------------
const userRole = new ConnectRoles({
  failureHandler: function(req, res, action) {
    // optional function to customise code that runs when
    // user fails authorisation
    res.status(403)
    res.send("Access Denied - You don't have permission to: " + action)
  }
})
router.use(userRole.middleware())

// anonymous users can only access the home page
// returning false stops any more rules from being
// considered
userRole.use((req, action) => {
  if (!req.isAuthenticated()) return action === 'guest'
})

userRole.use('normal', req => {
  if (req.user.roleId >= Role.User.NORMAL) return true
})

userRole.use('adminGuest', req => {
  if (req.user.roleId >= Role.User.ADMIN_GUEST) return true
})

userRole.use('adminDeveloper', req => {
  if (req.user.roleId >= Role.User.ADMIN_DEVELOPER) return true
})

userRole.use('adminSuper', req => {
  if (req.user.roleId === Role.User.ADMIN_SUPER) return true
})
// ------------------ CONNECT ROLES END---------------------

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('Express Server with JWT Authentication')
  })

  app.get('/user', requireAuth, function(req, res) {
    const { id, nickname, createdAt } = req.user
    res.send({ id, nickname, createdAt })
  })

  app.get('/admin', requireAuth, userRole.is('adminGuest'), function(req, res) {
    const { id, nickname, createdAt } = req.user
    res.send({ id, nickname, createdAt })
  })

  app.post('/signin', requireSignIn, Authentication.signin)

  app.post('/signup', Authentication.signup)
}
