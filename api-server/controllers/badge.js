const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
// const services = reqlib('/services')
// const BoxType = reqlib('/../shared/constants/BoxType')
// const Role = reqlib('/../shared/constants/Role')
// const Message = reqlib('/constants/Message')
// const Path = reqlib('/constants/Path')
// const { moveImages } = reqlib('/utils/image')

// バッジ獲得できる最初のレベル
const MIN_BADGE_LEVEL = 1

/**
 * バッジ取得
 */
exports.fetchList = async (req, res, next) => {
  const userId = req.params.userId || req.user.id
  const brandId = req.user.brand.id

  const rows = await models.Badge.findAll({
    attributes: ['badgeType', 'level', 'updatedAt'],
    where: {
      userId,
      brandId,
      level: {
        [models.Sequelize.Op.gte]: MIN_BADGE_LEVEL
      }
    },
    raw: true
  })

  res.json(rows)
}
