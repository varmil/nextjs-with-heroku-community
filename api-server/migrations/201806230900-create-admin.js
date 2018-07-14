const db = require('../models')
const tableName = db.Admin.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable(tableName, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
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
      .then(() => queryInterface.addIndex(tableName, { fields: ['userId'] }))
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
