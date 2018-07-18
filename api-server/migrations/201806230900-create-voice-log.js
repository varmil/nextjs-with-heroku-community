const db = require('../models')
const tableName = db.VoiceLog.tableName

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
        voterId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        choiceIndex: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        commentId: {
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
      .then(() => queryInterface.addIndex(tableName, { fields: ['postId'] }))
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
