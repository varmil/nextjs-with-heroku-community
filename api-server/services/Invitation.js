const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const Role = reqlib('/../shared/constants/Role')
const moment = require('moment')
const ConstInvitation = reqlib('/constants/Invitation')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20

module.exports = class Invitation {
  static makeid(length = 8) {
    let text = ''
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  static async save(brandId, emails, defaultRole = undefined) {
    try {
      const data = emails.map(email => {
        return {
          brandId,
          email,
          roleId: defaultRole || Role.User.NORMAL,
          status: ConstInvitation.NOT_JOINED,
          code: Invitation.makeid()
        }
      })
      return await models.Invitation.bulkCreate(data)
    } catch (e) {
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
