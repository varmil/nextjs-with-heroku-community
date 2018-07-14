const bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    nickname: DataTypes.STRING,
    iconPath: DataTypes.STRING,
    // 管理者が登録したときはそれ用のId定数を入れる
    roleId: DataTypes.INTEGER,
    lastLoginedAt: DataTypes.DATE,

    // 任意登録
    introduction: DataTypes.TEXT,
    birthday: DataTypes.STRING,
    prefecture: DataTypes.INTEGER,

    // facebook
    facebookId: DataTypes.BIGINT,
    facebookAccessToken: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    locale: DataTypes.STRING,
    gender: DataTypes.STRING,
    ageRangeMin: DataTypes.INTEGER,
    ageRangeMax: DataTypes.INTEGER,
    timezone: DataTypes.FLOAT,
    verified: DataTypes.BOOLEAN
  })

  // Class Method
  User.associate = models => {}

  User.generateHash = async password => {
    try {
      // generate a salt
      const salt = await bcrypt.genSalt(10)
      // hash the password along with our new salt
      const hash = await bcrypt.hash(password, salt)
      return hash
    } catch (e) {
      throw e
    }
  }

  // Instance Method (NOTE: arrow function does NOT bind "this")
  User.prototype.comparePasswords = async function(password) {
    try {
      const isMatch = await bcrypt.compare(password, this.passwordHash)
      return isMatch
    } catch (e) {
      throw e
    }
  }

  return User
}
