const reqlib = require('app-root-path').require
const NotificationService = reqlib('/services/Notification')
const Rule = reqlib('/../shared/constants/Rule')
const models = reqlib('/models')

module.exports = class Mention {
  /**
   * テキスト内容から`@`で始まりスペースが終わるまでのstringをリストとして返却する
   * ex) @aaa @bbb -> ['aaa', 'bbb']
   * @param {string} text
   * @returns {Arrya<string>} result
   */
  static regex(text) {
    const pattern = /\B@[a-z0-9_-]+/gi
    return text.match(pattern).map(mention => mention.replace('@', ''))
  }

  /**
   *
   * @param {*} targetUserIds
   * @param {*} data,
   * @param {Object} options
   * @param {Object} options.transaction
   */
  static async sendNotifications(targetUserIds, data, options) {
    if (!data) return false
    const userIds = await models.User.findAll({
      where: { id: targetUserIds }
    }).map(data => data.id)

    console.log(targetUserIds, userIds)
    await userIds.forEach(targetUserId => {
      NotificationService.save(
        Rule.NOTIFICATION_TYPE.Mention,
        Object.assign({}, data, { targetUserId }),
        options
      )
    })
  }
}
