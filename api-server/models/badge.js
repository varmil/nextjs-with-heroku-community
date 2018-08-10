// level:
// どのユーザがどのバッジを獲得済みか。（現在レベル）一度獲得したら消えない
//
// currentValue:
// それぞれのバッジに関する進行状況を保存しておく。
// 基本は特定アクション時にここをincrementして、
// バッジ獲得したかどうかチェックする。
module.exports = function(sequelize, DataTypes) {
  const Badge = sequelize.define('Badge', {
    userId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    badgeType: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    currentValue: DataTypes.INTEGER
  })
  return Badge
}
