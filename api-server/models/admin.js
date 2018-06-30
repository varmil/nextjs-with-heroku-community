module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define('Admin', {
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  })
  return Admin
}
