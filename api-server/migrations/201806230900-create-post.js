const db = require('../models')
const tableName = db.Post.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      boxType: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      posterId: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      isAdmin: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      title: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.TEXT
      },
      like: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      comment: {
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
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
