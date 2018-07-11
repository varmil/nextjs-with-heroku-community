const db = require('../models')
const tableName = db.PostLike.tableName

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
        postId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        upOrDown: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN
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
          fields: ['postId', 'userId'],
          unique: true
        })
      )
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
