const express = require('express')
const ConnectRoles = require('connect-roles')
const multer = require('multer')
const uuidv1 = require('uuid/v1')
const Role = require('./constants/Role')
const AuthController = require('./controllers/authentication')
const UserController = require('./controllers/user')
const SiteController = require('./controllers/site')
const PostController = require('./controllers/post')
const CommentController = require('./controllers/comment')

const passport = require('passport')
require('./services/passport')

const router = express.Router()
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false })

// ------------------ FILE UPLOAD ---------------------
// https://github.com/felixrieseberg/React-Dropzone-Component/blob/master/example/src-server/multerImpl.js
const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    let ext
    // 適切な拡張子を付与
    switch (file.mimetype) {
      case 'image/jpeg':
        ext = '.jpg'
        break
      case 'image/png':
        ext = '.png'
        break
      case 'image/gif':
        ext = '.gif'
        break
      default:
        console.error('file.mimetype does NOT match any type')
    }
    cb(null, uuidv1() + ext)
  }
})
const upload = multer({ storage })
// ------------------ FILE UPLOAD END ---------------------

// ------------------ CONNECT ROLES ---------------------
const userRole = new ConnectRoles({
  failureHandler: function(req, res, action) {
    // optional function to customise code that runs when
    // user fails authorisation
    res.status(403)
    res.json("Access Denied - You don't have permission to: " + action)
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
    res.json('Express Server with JWT Authentication')
  })

  app.get('/user', requireAuth, function(req, res) {
    const { id, nickname, iconPath, brand } = req.user
    res.json({ id, nickname, iconPath, brand })
  })

  // app.get('/admin', requireAuth, userRole.is('adminGuest'), function(req, res) {
  //   const { id, nickname, createdAt } = req.user
  //   res.json({ id, nickname, createdAt })
  // })

  /**
   * USER
   */
  app.post('/signin', requireSignIn, AuthController.signin)
  // 一般ユーザ
  app.post('/signup', AuthController.signup)
  app.post(
    '/user/profile',
    requireAuth,
    upload.single('image'),
    UserController.profile
  )
  app.post('/loginedat', requireAuth, UserController.updateLoginedAt)
  // 管理者（アイコンも同時登録）
  app.post('/signup/admin', upload.single('image'), AuthController.signup)

  /**
   * SITE （ブランドごとのデザイン）
   */
  app.post(
    '/site/design',
    requireAuth,
    userRole.is('adminGuest'),
    SiteController.saveDesign
  )
  app.get('/site/design', requireAuth, SiteController.fetchDesign)

  /**
   * POST
   */
  app.post('/post', requireAuth, upload.array('image'), PostController.save)
  app.post('/post/vote', requireAuth, PostController.saveVote)
  app.post('/post/like', requireAuth, PostController.saveLike)
  app.get('/post/:postId', requireAuth, PostController.fetch)
  app.get('/post/list/count', requireAuth, PostController.countAll)
  app.get('/post/list/:pageNum', requireAuth, PostController.fetchList)
  app.get('/post/list/me/:pageNum', requireAuth, PostController.fetchMyPosts)
  app.get(
    '/post/list/box/:boxType/:pageNum',
    requireAuth,
    PostController.fetchListOfBox
  )

  /**
   * COMMENT
   */
  app.post('/comment', requireAuth, CommentController.save)
  app.get(
    '/comments/:postId/:pageNum',
    requireAuth,
    CommentController.fetchList
  )

  /**
   * FAN
   */
  app.get('/fan/list/:pageNum', requireAuth, UserController.fetchInBrand)
}
