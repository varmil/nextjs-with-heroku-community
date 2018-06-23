var db = require('../models')
const tableName = db.Admin.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      first_name: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
