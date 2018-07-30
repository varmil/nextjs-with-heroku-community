module.exports = function(sequelize, DataTypes) {
  const Notification = sequelize.define('Notification', {
    type: DataTypes.INTEGER,
    // 被通知対象者
    userId: DataTypes.INTEGER,
    // 通知があったポスト
    postId: DataTypes.INTEGER,
    // Like, Comment などを行ったユーザ
    actionUserIds: DataTypes.JSON,
    // 既読フラグ（これが立ったら次はINSERT）
    isRead: DataTypes.BOOLEAN
  })
  return Notification
}
