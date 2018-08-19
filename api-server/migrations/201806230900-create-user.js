const db = require('../models')
const tableName = db.User.tableName

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
        iconPath: {
          allowNull: false,
          defaultValue: '',
          type: Sequelize.STRING
        },
        roleId: {
          allowNull: false,
          defaultValue: 0,
          type: Sequelize.INTEGER
        },
        lastLoginedAt: {
          allowNull: false,
          defaultValue: db.sequelize.fn('NOW'),
          type: Sequelize.DATE
        },

        introduction: {
          allowNull: true,
          type: Sequelize.TEXT
        },
        birthday: {
          allowNull: false,
          defaultValue: '',
          type: Sequelize.STRING
        },
        prefecture: {
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
          fields: ['nickname']
          // unique: true
        })
      )
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
