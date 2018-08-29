const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
const BrandType = reqlib('/../shared/constants/BrandType')

module.exports = class Partner {
  /**
   * 他社連携する際に、そのパートナー企業のレコードを作成
   * options.transaction
   */
  static async create(userId, partnerUserId, brandId, options = {}) {
    if (!userId || !partnerUserId || !brandId) return

    const brandType = (await models.Brand.findById(brandId)).type
    switch (brandType) {
      case BrandType.BASE_FOOD:
        await models.BaseFoodUser.create(
          {
            userId,
            partnerUserId
          },
          options
        )
        break
      default:
    }
  }
}
