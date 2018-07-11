const _ = require('lodash')
const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const BoxType = reqlib('/../shared/constants/BoxType')
const Role = reqlib('/constants/Role')
const Message = reqlib('/constants/Message')

/**
 * save
 */
exports.saveDesign = async (req, res, next) => {
  console.log('[saveDesign]body', req.body)
  const { siteState } = req.body
  if (_.isEmpty(siteState)) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    const brandId = req.user.brand.id
    await models.Brand.update({ design: siteState }, { where: { id: brandId } })
    res.json(true)
  } catch (e) {
    next(e)
  }
}

/**
 * fetch
 */
exports.fetchDesign = async (req, res) => {
  const brandId = req.user.brand.id
  const state = await models.Brand.findById(brandId, { raw: true })
  res.json({ state })
}
