// 管理者との紐付き（管理しているブランド）
// UsersBrandsを基本的に使う？
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
