module.exports = function(sequelize, DataTypes) {
  const BaseFoodUser = sequelize.define('BaseFoodUser', {
    userId: DataTypes.INTEGER,
    partnerUserId: DataTypes.INTEGER
  })
  return BaseFoodUser
}
