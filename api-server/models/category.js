// Postのカテゴリ
module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    brandId: DataTypes.INTEGER,
    boxType: DataTypes.INTEGER,
    categoryIndex: DataTypes.INTEGER,
    name: DataTypes.STRING
  })
  return Category
}
