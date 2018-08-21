const db = require('../models')
const tableName = db.Contact.tableName

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
        type: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        brandId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        text: {
          allowNull: false,
          type: Sequelize.TEXT
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
      .then(() => queryInterface.addIndex(tableName, { fields: ['brandId'] }))
      .then(() => queryInterface.addIndex(tableName, { fields: ['userId'] }))
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
