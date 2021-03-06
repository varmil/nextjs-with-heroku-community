const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const InvitationService = reqlib('/services/Invitation')
const BadgeService = reqlib('/services/Badge')
const PartnerService = reqlib('/services/Partner')
const Path = reqlib('/constants/Path')
const Role = reqlib('/../shared/constants/Role')
const { BadgeType } = reqlib('/../shared/constants/Badge')
const { moveImage } = reqlib('/utils/image')
const moment = require('moment')
const sanitizer = reqlib('/utils/sanitizer')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20
const DEFAULT_ICON_PATH = '/static/img/icon/usericon_default.png'

const LAST_LOGINED_AT_UPDATE_INTERVAL_MIN = 10

module.exports = class User {
  // { <id>: { name, iconPath }, ... } というObjectを返す
  static async fetchAllObj(ids) {
    if (!_.isArray(ids) || _.isEmpty(ids)) return {}

    const filterdIds = _.compact(_.uniq(ids))
    const names = await models.User.findAll({
      attributes: ['id', 'nickname', 'lastName', 'firstName', 'iconPath'],
      where: { id: filterdIds },
      raw: true
    })
    return names.reduce((acc, cur) => {
      // name
      let name = ''
      if (cur.nickname) name = cur.nickname
      else name = `${cur.lastName} ${cur.firstName}`

      return {
        ...acc,
        [cur.id]: { name, iconPath: cur.iconPath }
      }
    }, {})
  }

  static async updateLastLoginedAtIfNeeded(userId, brandId, lastLoginedAt) {
    // DBデータより、10分以上経っていたら更新
    const elapsed = moment().diff(lastLoginedAt, 'm')
    try {
      if (elapsed > LAST_LOGINED_AT_UPDATE_INTERVAL_MIN) {
        await models.User.update(
          { lastLoginedAt: new Date() },
          {
            where: { id: userId }
          }
        )
      }

      // バッジ用。連続ログイン日数判定
      {
        const date = moment().date()
        const lastLoginedDate = moment(lastLoginedAt).date()
        console.log('DATE', date, 'lastLoginedDate', lastLoginedDate)
        // 日付が異なっていたら日をまたいだと判断する（ちょうど1ヶ月ぶりにログインすると正常に動かないが、まあないでしょ）
        if (date !== lastLoginedDate) {
          await BadgeService.incrementValue(
            userId,
            brandId,
            BadgeType.CONTINUOUS_LOGIN
          )
        }
      }
    } catch (e) {
      throw e
    }
  }

  static async moveProfileIcon(file) {
    let dbPath
    if (file) {
      // image path
      const { path, filename } = file
      dbPath = `${Path.USER_ICON_DIR}/${filename}`
      const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`
      await moveImage(path, fullPath)
    } else {
      // fileがない場合は何もしない
    }
    return dbPath
  }

  static async updateProfile(userId, file, body) {
    const {
      // 共通
      email,
      password,
      fromServerFiles,
      // 一般ユーザ
      nickname,
      introduction,
      // 管理者
      lastName,
      firstName,
      roleId
    } = body

    try {
      // プロフィール画像は毎回更新かけておく
      let dbPath = await User.moveProfileIcon(file)
      if (!dbPath) {
        if (fromServerFiles && fromServerFiles.length > 0) {
          // すでにサーバに保存されている画像があれば使用
          dbPath = fromServerFiles[0]
        } else {
          // デフォルトは卵
          dbPath = DEFAULT_ICON_PATH
        }
      }

      // UPDATE項目追加していく
      let data = { iconPath: dbPath }
      if (email) {
        data = { ...data, email }
      }
      if (password) {
        data = {
          ...data,
          passwordHash: await models.User.generateHash(password)
        }
      }
      if (nickname) {
        data = { ...data, nickname: sanitizer.html(nickname) }
      }
      if (introduction) {
        data = { ...data, introduction: sanitizer.html(introduction) }
      }
      if (lastName) {
        data = { ...data, lastName }
      }
      if (firstName) {
        data = { ...data, firstName }
      }
      if (roleId) {
        data = { ...data, roleId: +roleId }
      }

      // DB更新
      await models.User.update(data, {
        where: { id: userId }
      })
    } catch (e) {
      throw e
    }
  }

  /**
   * 1人目の管理者以外の全てのユーザ（管理者 or ファン）はこれで登録
   */
  static async createUser(
    code,
    email,
    password,
    brandId,
    roleId,
    options = {}
  ) {
    const trans = await models.sequelize.transaction()
    try {
      const user = await models.User.create(
        {
          email,
          passwordHash: await models.User.generateHash(password),
          roleId: roleId || Role.User.NORMAL,
          iconPath: DEFAULT_ICON_PATH
        },
        {
          transaction: trans
        }
      )

      await models.UserBrand.create(
        {
          userId: user.id,
          brandId
        },
        {
          transaction: trans
        }
      )

      // 管理者特有処理
      if (roleId >= Role.User.ADMIN_GUEST) {
        await models.AdminBrand.create(
          {
            userId: user.id,
            brandId: brandId
          },
          {
            transaction: trans
          }
        )
      }

      // 他社と連携する場合
      if (options.partnerUserId) {
        await PartnerService.create(user.id, options.partnerUserId, brandId, {
          transaction: trans
        })
      }

      // Invitationテーブル更新
      await InvitationService.joinUser(code, trans)

      trans.commit()
      return user
    } catch (e) {
      trans.rollback()
      throw e
    }
  }

  static async createFirstAdmin(
    email,
    password,
    brandName,
    lastName,
    firstName,
    file
  ) {
    const trans = await models.sequelize.transaction()
    try {
      // プロフィール画像
      let dbPath = await User.moveProfileIcon(file)
      if (!dbPath) {
        dbPath = DEFAULT_ICON_PATH
      }

      const user = await models.User.create(
        {
          email,
          passwordHash: await models.User.generateHash(password),
          roleId: Role.User.ADMIN_SUPER,
          lastName,
          firstName,
          iconPath: dbPath
        },
        {
          transaction: trans
        }
      )

      const brand = await models.Brand.create(
        {
          name: brandName
        },
        {
          transaction: trans
        }
      )

      await models.AdminBrand.create(
        {
          userId: user.id,
          brandId: brand.id
        },
        {
          transaction: trans
        }
      )

      await models.UserBrand.create(
        {
          userId: user.id,
          brandId: brand.id
        },
        {
          transaction: trans
        }
      )
      trans.commit()
      return user
    } catch (e) {
      trans.rollback()
      throw e
    }
  }

  static async fetchBrand(userId) {
    try {
      const { brandId } = await models.UserBrand.findOne(
        { where: { userId } },
        { raw: true }
      )
      if (!brandId) return null

      const brand = await models.Brand.findById(brandId, {
        attributes: ['id', 'name', 'type'],
        raw: true
      })
      return brand
    } catch (e) {
      console.error(e)
      return null
    }
  }

  // ユーザを複数取得（Admin画面のファン一覧など）
  static async fetchList(pageNum, where, options = {}) {
    if (!where.brandId) {
      console.warn('[User.fetchList] brandId is nil')
      return []
    }

    // optionsを展開
    let { perPage } = options
    perPage = +perPage || DEFAULT_PER_PAGE

    try {
      // 関連テーブルからIDフェッチ
      const usersBrands = await models.UserBrand.findAll({
        attributes: ['userId', 'createdAt'],
        where: where,
        limit: perPage,
        offset: perPage * (pageNum - 1),
        order: [['id', 'DESC']],
        raw: true
      })

      // ユーザ取得
      const users = await models.User.findAll({
        where: { id: _.map(usersBrands, 'userId') },
        order: [['id', 'DESC']],
        raw: true
      })
      const userIds = _.map(users, 'id')

      // 各種情報（投稿数、いいね、コメント、バッジ、etc.）
      let postCountObj = await models.Post.findAll({
        attributes: ['posterId', User.getCountAttr()],
        where: { posterId: userIds },
        group: 'posterId',
        raw: true
      })
      postCountObj = User.arrToObj(postCountObj, 'posterId', 'count')

      let likeCountObj = await models.PostLike.findAll({
        attributes: ['userId', User.getCountAttr()],
        where: { userId: userIds, upOrDown: true },
        group: 'userId',
        raw: true
      })
      likeCountObj = User.arrToObj(likeCountObj, 'userId', 'count')

      let commentCountObj = await models.Comment.findAll({
        attributes: ['commenterId', User.getCountAttr()],
        where: { commenterId: userIds },
        group: 'commenterId',
        raw: true
      })
      commentCountObj = User.arrToObj(commentCountObj, 'commenterId', 'count')

      // users配列に上記情報をmerge
      const merged = users.map(user => {
        return {
          ...user,
          post: postCountObj[user.id] || 0,
          like: likeCountObj[user.id] || 0,
          comment: commentCountObj[user.id] || 0,
          loyalty: null,
          badge: null,
          event: null
        }
      })
      // console.log(merged)
      return merged
    } catch (e) {
      throw e
    }
  }

  static arrToObj(arr, key, value) {
    return _.chain(arr)
      .keyBy(key)
      .mapValues(value)
      .value()
  }

  // sequelizeで count クエリを発行するための関数
  static getCountAttr() {
    return [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']
  }

  // ブランドに紐づく管理者一覧を取得
  static async fetchAllAdmins(brandId) {
    if (!brandId) {
      console.warn('[fetchAllAdmins] brandId is nil')
      return []
    }

    try {
      // 関連テーブルからIDフェッチ
      const adminsBrands = await models.AdminBrand.findAll({
        attributes: ['userId'],
        where: { brandId },
        order: [['id', 'DESC']],
        raw: true
      })
      // ユーザ取得
      const users = await models.User.findAll({
        where: {
          id: _.map(adminsBrands, 'userId'),
          roleId: {
            [models.Sequelize.Op.gte]: Role.User.ADMIN_GUEST
          }
        },
        order: [['id', 'DESC']],
        raw: true
      })
      return users
    } catch (e) {
      throw e
    }
  }
}
