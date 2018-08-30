// ユーザの１票。
module.exports = function(sequelize, DataTypes) {
  const VoiceLog = sequelize.define('VoiceLog', {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    voterId: DataTypes.INTEGER,
    // 0 - 4 : どの選択肢を選んだのか
    choiceIndex: DataTypes.INTEGER,
    // 投票に紐づくコメント。
    commentId: DataTypes.INTEGER
  })
  return VoiceLog
}
