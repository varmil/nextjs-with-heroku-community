module.exports = function(sequelize, DataTypes) {
  var AdminBrand = sequelize.define(
    'AdminBrand',
    {
      adminId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER
    },
    {
      tableName: 'AdminsBrands'
    }
  )
  return AdminBrand
}
