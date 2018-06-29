// VOICEの集計テーブルは現状ないので、ここを毎回SELECT COUNTするイメージ
module.exports = function(sequelize, DataTypes) {
  const VoiceLog = sequelize.define('VoiceLog', {
    postId: DataTypes.INTEGER,
    voterId: DataTypes.INTEGER,
    // 0 - 4 : どの選択肢を選んだのか
    choiceIndex: DataTypes.INTEGER
  })
  return VoiceLog
}
