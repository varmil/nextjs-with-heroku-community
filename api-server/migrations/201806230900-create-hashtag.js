const db = require('../models')
const tableName = db.Hashtag.tableName

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
        name: {
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
      .then(() => queryInterface.addIndex(tableName, { fields: ['name'] }))
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
