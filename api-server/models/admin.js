module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define('Admin', {
    userId: DataTypes.INTEGER
  })
  return Admin
}
