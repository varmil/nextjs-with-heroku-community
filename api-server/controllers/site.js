const _ = require('lodash')
const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const BoxType = reqlib('/../shared/constants/BoxType')
const Role = reqlib('/../shared/constants/Role')
const Message = reqlib('/constants/Message')
const Path = reqlib('/constants/Path')
const { moveImages } = reqlib('/utils/image')

/**
 * save design
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
 * fetch design
 */
exports.fetchDesign = async (req, res) => {
  const brandId = req.user.brand.id
  const { design } = await models.Brand.findById(brandId, {
    attributes: ['design'],
    raw: true
  })
  res.json({ design })
}

/**
 * save library images
 */
exports.saveLibraries = async (req, res, next) => {
  console.log('[saveLibraries]body', req.body)
  console.log('[saveLibraries]file', req.files)
  const files = req.files
  const brandId = req.user.brand.id

  if (_.isEmpty(files)) {
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  try {
    const paths = await moveImages(files, Path.LIBRARY_IMG_DIR)
    const data = paths.map(p => ({ brandId, path: p }))
    await models.BrandLibrary.bulkCreate(data)
    res.json(true)
  } catch (e) {
    next(e)
  }
}

/**
 * fetch design
 */
exports.fetchLibraries = async (req, res) => {
  // const brandId = req.user.brand.id
  // const { design } = await models.Brand.findById(brandId, {
  //   attributes: ['design'],
  //   raw: true
  // })
  // res.json({ design })
}
