const db = require('../models')
const tableName = db.BrandLibrary.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addIndex(tableName, {
      fields: ['brandId']
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeIndex(tableName, 'brand_libraries_brand_id')
  }
}
