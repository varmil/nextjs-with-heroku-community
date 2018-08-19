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
    const list = text.match(pattern)

    if (!list) return null
    return list.map(mention => mention.replace('@', ''))
  }

  /**
   *
   * @param {Array<string>} targets
   * @param {Object} data,
   * @param {Object} options
   * @param {Object} options.transaction
   */
  static async sendNotifications(targets, data, options) {
    if (!data) return false

    // 現状nicknameはuniqueではないので意図しないユーザーに送られてしまうこともある
    const userIds = await models.User.findAll({
      where: { nickname: targets }
    }).map(data => data.id)

    await userIds.forEach(targetUserId => {
      NotificationService.save(
        Rule.NOTIFICATION_TYPE.Mention,
        Object.assign({}, data, { targetUserId }),
        options
      )
    })
  }
}
