var db = require('../models')
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
      nickname: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },

      facebook_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.BIGINT
      },
      facebook_access_token: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      first_name: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      profile_photo_path: {
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
      email: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      age_range_min: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      age_range_max: {
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
