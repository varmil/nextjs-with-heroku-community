const _ = require('lodash')
const reqlib = require('app-root-path').require
const models = reqlib('/models')
// const services = reqlib('/services')
// const BoxType = reqlib('/../shared/constants/BoxType')
// const Role = reqlib('/../shared/constants/Role')
// const Message = reqlib('/constants/Message')
// const Path = reqlib('/constants/Path')
// const { moveImages } = reqlib('/utils/image')

/**
 * バッジ取得
 */
exports.fetchList = async (req, res, next) => {
  const userId = req.user.id
  const brandId = req.user.brand.id

  const rows = await models.Badge.findAll({
    attributes: ['badgeType', 'level', 'updatedAt'],
    where: { userId, brandId },
    raw: true
  })
  res.json(rows)
}
