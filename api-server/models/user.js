module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,

    nickname: DataTypes.STRING,
    facebookId: DataTypes.BIGINT,
    facebookAccessToken: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilePhotoPath: DataTypes.STRING,
    locale: DataTypes.STRING,
    gender: DataTypes.STRING,
    ageRangeMin: DataTypes.INTEGER,
    ageRangeMax: DataTypes.INTEGER,
    timezone: DataTypes.FLOAT,
    verified: DataTypes.BOOLEAN,
    birthday: DataTypes.STRING
  })

  // Class Method
  User.associate = models => {}

  // Instance Method
  User.prototype.someMethod = () => {}

  return User
}
