const db = require('../models')
const tableName = db.Voice.tableName

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
        options: {
          allowNull: true,
          type: Sequelize.JSON
        },
        deadline: {
          allowNull: false,
          defaultValue: '',
          type: Sequelize.STRING
        },
        count: {
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
        queryInterface.addIndex(tableName, { fields: ['postId'], unique: true })
      )
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
