// ユーザとの紐付き（ファンになっているブランド）
module.exports = function(sequelize, DataTypes) {
  var UserBrand = sequelize.define(
    'UserBrand',
    {
      userId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER
    },
    {
      tableName: 'UsersBrands'
    }
  )
  return UserBrand
}
