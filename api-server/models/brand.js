module.exports = function(sequelize, DataTypes) {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    design: DataTypes.JSON,
    // 他社との認証連携、API連携でどうしても専用対応が必要な場合
    // /shared/constants/Brand.js の値とヒモ付
    type: DataTypes.INTEGER
  })
  return Brand
}
