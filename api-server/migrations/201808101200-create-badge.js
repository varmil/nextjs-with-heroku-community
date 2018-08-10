const db = require('../models')
const tableName = db.Badge.tableName

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
        brandId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        badgeType: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        level: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        currentValue: {
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
      .then(() =>
        queryInterface.addIndex(tableName, {
          fields: ['userId', 'brandId', 'badgeType'],
          unique: true
        })
      )
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
