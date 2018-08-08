// ライブラリ画像
module.exports = function(sequelize, DataTypes) {
  const BrandLibrary = sequelize.define('BrandLibrary', {
    brandId: DataTypes.INTEGER,
    path: DataTypes.STRING
  })
  return BrandLibrary
}
