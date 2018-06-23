module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    nickname: DataTypes.STRING,
    facebook_id: DataTypes.BIGINT,
    facebook_access_token: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    profile_photo_path: DataTypes.STRING,
    locale: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    age_range_min: DataTypes.INTEGER,
    age_range_max: DataTypes.INTEGER,
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
