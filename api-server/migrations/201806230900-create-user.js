const db = require('../models')
const tableName = db.User.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      passwordHash: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      nickname: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      roleId: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },

      facebookId: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.BIGINT
      },
      facebookAccessToken: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      profilePhotoPath: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      locale: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      ageRangeMin: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      ageRangeMax: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      timezone: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      verified: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      birthday: {
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
