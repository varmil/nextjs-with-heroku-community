// User, Admin兼用するかも
module.exports = function(sequelize, DataTypes) {
  const Invitation = sequelize.define('Invitation', {
    brandId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    // 管理者の場合はこれで識別？
    roleId: DataTypes.INTEGER,
    // 0: 未送付,  10: 未参加, 100: 参加済み
    status: DataTypes.INTEGER,
    // 参加日
    joinedAt: DataTypes.DATE,
    // 招待コード
    code: DataTypes.STRING
  })
  return Invitation
}
