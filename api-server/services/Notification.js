const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const UserService = reqlib('/services/User')
const BadgeService = reqlib('/services/Badge')
const moment = reqlib('/utils/moment')
const Rule = reqlib('/../shared/constants/Rule')
const { BadgeType } = reqlib('/../shared/constants/Badge')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20

module.exports = class Notification {
  // 通知を更新 / 新規保存
  /**
   * 指定したNotificationをtargetとなるユーザーのnotificationをして追加
   * @param {int} type
   * @param {Object} data
   * @param {int} data.targetUserId 対象ユーザーID
   * @param {int} data.actionUserId アクションしたユーザーID
   * @param {int} data.postId 対象記事
   * @param {int} data.brandId ブランドID
   * @param {Object} option
   */
  static async save(type, data, option) {
    try {
      if (!data) return

      const { postId, actionUserId, targetUserId, brandId } = data

      // 必要なデータがどれか一つでもかけていたらreturn
      if (!postId || !actionUserId || !targetUserId || !brandId) return

      // 自分で自分の投稿にアクションした場合は何もしない
      if (actionUserId === targetUserId) return

      // 未読通知があるならUPDATE、なければINSERT
      const existingRow = await models.Notification.findOne({
        where: { userId: targetUserId, postId, type, isRead: false }
      })

      if (existingRow) {
        const actionUserIds = _.uniq(
          _.concat(existingRow.actionUserIds, actionUserId)
        )
        await existingRow.update({ actionUserIds })
      } else {
        await models.Notification.create({
          type,
          userId: targetUserId,
          postId,
          actionUserIds: [actionUserId],
          isRead: false
        })
      }

      // badge
      {
        let badgeType
        switch (type) {
          case Rule.NOTIFICATION_TYPE.Like:
            badgeType = BadgeType.GET_LIKE
            break
          case Rule.NOTIFICATION_TYPE.Comment:
            badgeType = BadgeType.GET_COMMENT
            break
          default:
        }
        if (!_.isNil(badgeType)) {
          await BadgeService.incrementValue(userId, brandId, badgeType, option)
        }
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

  // 複数取得
  static async fetchList(pageNum, where, options = {}) {
    if (!where.userId) {
      console.warn('[Notification.fetchList] userId is nil')
      return []
    }

    // optionsを展開
    let { perPage } = options
    perPage = +perPage || DEFAULT_PER_PAGE

    try {
      let data = await models.Notification.findAll({
        where,
        limit: perPage,
        offset: perPage * (pageNum - 1),
        order: [['id', 'DESC']],
        raw: true
      })

      // flatten actionUserIds --> userObj --> add username
      // 先頭の１名のみユーザ名が分かればOK
      {
        const userIds = _.uniq(_.flatMap(data, row => row.actionUserIds))
        const userObj = await UserService.fetchAllObj(userIds)
        data = data.map(e => ({
          ...e,
          firstUsername: userObj[e.actionUserIds[0]].name,
          iconPath: userObj[e.actionUserIds[0]].iconPath
        }))
      }

      // add actionCount
      data = data.map(e => ({ ...e, actionCount: e.actionUserIds.length }))

      // postId --> post title
      {
        const rows = await models.Post.findAll({
          attributes: ['id', 'title'],
          where: { id: _.map(data, 'postId') }
        })
        data = data.map(e => ({
          ...e,
          title: _.find(rows, { id: e.postId }).title
        }))
      }

      // createdAt --> XX hours ago
      data = data.map(e => ({
        ...e,
        createdAt: moment.getMomentDiffAgo(e.createdAt)
      }))

      return data.map(e =>
        _.pick(e, [
          'type',
          'isRead',
          'firstUsername',
          'actionCount',
          'title',
          'createdAt'
        ])
      )
    } catch (e) {
      throw e
    }
  }
}
