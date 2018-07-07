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
      brandId: {
        allowNull: false,
        defaultValue: 0,
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
      released: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      categoryIndex: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      images: {
        allowNull: true,
        type: Sequelize.JSON
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
