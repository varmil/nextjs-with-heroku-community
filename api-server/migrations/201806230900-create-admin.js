const db = require('../models')
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
      email: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      passwordHash: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      roleId: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },

      firstName: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      lastName: {
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
