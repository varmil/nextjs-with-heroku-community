const db = require('../models')
const tableName = db.Category.tableName

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
      categoryIndex: {
        allowNull: false,
        defaultValue: 0,
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
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
