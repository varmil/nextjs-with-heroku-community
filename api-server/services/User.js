const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const Path = reqlib('/constants/Path')
const Role = reqlib('/../shared/constants/Role')
const { moveImage } = reqlib('/utils/image')
const moment = require('moment')

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

  static async updateLastLoginedAtIfNeeded(userId, lastLoginedAt) {
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

  static async updateProfile(userId, nickname, file, fromServerFiles) {
    try {
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

      await models.User.update(
        { nickname, iconPath: dbPath },
        {
          where: { id: userId }
        }
      )
    } catch (e) {
      throw e
    }
  }

  static async createNormalUser(email, password, brandId) {
    const trans = await models.sequelize.transaction()
    try {
      const user = await models.User.create(
        {
          email,
          passwordHash: await models.User.generateHash(password),
          roleId: Role.User.NORMAL
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
      trans.commit()
      return user
    } catch (e) {
      trans.rollback()
      throw e
    }
  }

  static async createAdmin(
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

      const admin = await models.Admin.create(
        {
          userId: user.id
        },
        {
          transaction: trans
        }
      )

      await models.AdminBrand.create(
        {
          adminId: admin.id,
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
        attributes: ['id', 'name'],
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
    return _
      .chain(arr)
      .keyBy(key)
      .mapValues(value)
      .value()
  }

  // sequelizeで count クエリを発行するための関数
  static getCountAttr() {
    return [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']
  }
}
