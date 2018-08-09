// どのユーザがどのバッジを獲得済みか
module.exports = function(sequelize, DataTypes) {
  const Badge = sequelize.define('Badge', {
    userId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    badgeId: DataTypes.INTEGER,
    badgeType: DataTypes.INTEGER
  })
  return Badge
}
