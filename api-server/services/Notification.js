const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const moment = require('moment')
const Role = reqlib('/../shared/constants/Role')
const Rule = reqlib('/../shared/constants/Rule')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20

module.exports = class Notification {
  // 通知を更新 / 新規保存
  static async save(type, postId, actionUserId) {
    try {
      // postIdから投稿者取得
      const userId = (await models.Post.findById(postId, { raw: true }))
        .posterId

      // 自分で自分の投稿にアクションした場合は何もしない
      if (+actionUserId === userId) return

      // 未読通知があるならUPDATE、なければINSERT
      const existingRow = await models.Notification.findOne({
        where: { userId, postId, type, isRead: false }
      })

      if (existingRow) {
        const actionUserIds = _.uniq(
          _.concat(existingRow.actionUserIds, actionUserId)
        )
        await existingRow.update({ actionUserIds })
      } else {
        await models.Notification.create({
          type,
          userId,
          postId,
          actionUserId: [actionUserId],
          isRead: false
        })
      }

      return true
    } catch (e) {
      throw e
    }
  }

  // 通知を最新分まで既読にする
  static async updateAllRead(userId) {
    try {
      await models.Notification.update(
        { isRead: true },
        {
          where: { userId, isRead: false }
        }
      )
      return true
    } catch (e) {
      throw e
    }
  }

  // 複数取得（Admin画面の一覧など）
  // static async fetchList(pageNum, where, options = {}) {
  //   if (!where.brandId) {
  //     console.warn('[Invitation.fetchList] brandId is nil')
  //     return []
  //   }
  //
  //   // optionsを展開
  //   let { perPage } = options
  //   perPage = +perPage || DEFAULT_PER_PAGE
  //
  //   try {
  //     // ユーザ取得
  //     const invitations = await models.Invitation.findAll({
  //       where,
  //       limit: perPage,
  //       offset: perPage * (pageNum - 1),
  //       order: [['id', 'DESC']],
  //       raw: true
  //     })
  //     return invitations
  //   } catch (e) {
  //     throw e
  //   }
  // }
}
