const db = require('../models')
const tableName = db.User.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addIndex(tableName, {
      fields: ['nickname']
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeIndex(tableName, 'users_nickname')
  }
}
