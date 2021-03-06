const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const ConstBadge = reqlib('/../shared/constants/Badge')
// const InvitationService = reqlib('/services/Invitation')
// const Path = reqlib('/constants/Path')
// const Role = reqlib('/../shared/constants/Role')
// const moment = require('moment')

module.exports = class Badge {
  /**
   * 当該badgeTypeを１つカウントアップ
   * @param {Object} options
   * @param {Object} options.transaction
   */
  static async incrementValue(userId, brandId, badgeType, options = {}) {
    if (_.isNil(userId) || _.isNil(brandId) || _.isNil(badgeType)) {
      console.warn('required param is null', userId, brandId, badgeType)
      return false
    }

    try {
      const row = await models.Badge.findOne({
        where: { userId, brandId, badgeType }
      })

      // 存在すればUPDATE, なければINSERT
      if (row) {
        const nextValue = row.currentValue + 1
        await row.update(
          {
            // 一度到達したlevelは下がらない
            level: Math.max(row.level, Badge.getLevel(badgeType, nextValue)),
            currentValue: nextValue
          },
          {},
          options
        )
      } else {
        // 初期レベル設定。valueは１固定。ほかあるかも
        const nextValue = 1
        await models.Badge.create(
          {
            userId,
            brandId,
            badgeType,
            level: Badge.getLevel(badgeType, nextValue),
            currentValue: nextValue
          },
          options
        )
      }
    } catch (e) {
      throw e
    }
  }

  static getLevel(badgeType, value) {
    const sorted = _.orderBy(
      ConstBadge.Badge[badgeType].items,
      ['level'],
      ['desc']
    )
    const found = _.find(sorted, spec => value >= spec.value)
    if (!found) return 0
    return found.level
  }
}
