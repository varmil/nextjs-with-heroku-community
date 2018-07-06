// POSTするときにboxTypeがVOICEだった場合に追加でここへINSERT
module.exports = function(sequelize, DataTypes) {
  const Voice = sequelize.define('Voice', {
    postId: DataTypes.INTEGER,
    // 選択肢（配列）
    options: DataTypes.JSON,
    // 期日
    deadline: DataTypes.STRING
  })
  return Voice
}
