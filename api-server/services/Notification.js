const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const UserService = reqlib('/services/User')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const moment = reqlib('/utils/moment')
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
          actionUserIds: [actionUserId],
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
