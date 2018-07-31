const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const Role = reqlib('/../shared/constants/Role')
const moment = require('moment')
const ConstInvitation = reqlib('/../shared/constants/Invitation')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20

module.exports = class Invitation {
  // 招待コード用
  static makeid(length = 8) {
    let text = ''
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  static async save(brandId, emails, defaultRole = undefined) {
    // emailsは文字列でも配列でもOK
    if (!_.isString(emails) && !_.isArray(emails)) {
      console.error('emails should be string or array')
      return
    }
    emails = _.isString(emails) ? [emails] : emails

    try {
      // codeがUNIQUEになるまで再生成し続ける
      let codes = []
      let codeShouldBeMaked = true
      while (codeShouldBeMaked) {
        // 人数分のcodeをまず試しに作る
        codes = emails.map(email => Invitation.makeid())
        // 念の為codeが1つもかぶってないかチェック
        const count = await models.Invitation.count({
          where: { code: codes },
          raw: true
        })
        if (count === 0) codeShouldBeMaked = false
      }

      const data = emails.map((email, i) => {
        return {
          brandId,
          email,
          roleId: defaultRole || Role.User.NORMAL,
          status: ConstInvitation.NOT_JOINED,
          code: codes[i]
        }
      })
      return await models.Invitation.bulkCreate(data)
    } catch (e) {
      throw e
    }
  }

  // 複数取得（Admin画面の一覧など）
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
      const invitations = await models.Invitation.findAll({
        where,
        limit: perPage,
        offset: perPage * (pageNum - 1),
        order: [['id', 'DESC']],
        raw: true
      })
      return invitations
    } catch (e) {
      throw e
    }
  }
}
