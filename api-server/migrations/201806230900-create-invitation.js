const db = require('../models')
const tableName = db.Invitation.tableName

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

        brandId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        email: {
          allowNull: false,
          defaultValue: '',
          type: Sequelize.STRING
        },
        roleId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        status: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        joinedAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
        code: {
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
      .then(() =>
        queryInterface.addIndex(tableName, { fields: ['email'], unique: true })
      )
      .then(() =>
        queryInterface.addIndex(tableName, {
          fields: ['brandId', 'code'],
          unique: true
        })
      )
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
