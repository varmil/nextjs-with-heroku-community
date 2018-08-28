const db = require('../models')
const tableName = db.Brand.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, 'type', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
      after: 'design'
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(tableName, 'type')
  }
}
