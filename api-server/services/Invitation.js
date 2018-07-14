const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const Role = reqlib('/constants/Role')
const moment = require('moment')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20

module.exports = class Invitation {
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

  // ユーザを複数取得（Admin画面のファン一覧など）
  static async fetchList(pageNum, where, options = {}) {
    if (!where.brandId) {
      console.warn('[Invitation.fetchList] brandId is nil')
      return []
    }

    // optionsを展開
    let { perPage } = options
    perPage = +perPage || DEFAULT_PER_PAGE

    try {
      // ユーザ取得
      const users = await models.Invitation.findAll({
        where,
        limit: perPage,
        offset: perPage * (pageNum - 1),
        order: [['id', 'DESC']],
        raw: true
      })
      return users
    } catch (e) {
      throw e
    }
  }
}
