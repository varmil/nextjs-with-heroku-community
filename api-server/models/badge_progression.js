// それぞれのバッジに関する進行状況を保存しておく。
// 基本は特定アクション時にvalueをincrementして、
// バッジ獲得したかどうかチェックする。
module.exports = function(sequelize, DataTypes) {
  const BadgeProgression = sequelize.define('BadgeProgression', {
    userId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    badgeType: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  })
  return BadgeProgression
}
