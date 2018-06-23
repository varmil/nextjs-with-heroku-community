module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define('Admin', {
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  })
  return Admin
}
