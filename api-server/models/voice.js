// POSTするときにboxTypeがVOICEだった場合に追加でここへINSERT
module.exports = function(sequelize, DataTypes) {
  const Voice = sequelize.define('Voice', {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    // 選択肢（配列）
    options: DataTypes.JSON,
    // 期日
    deadline: DataTypes.STRING,
    // 現在の投票数
    count: DataTypes.INTEGER
  })
  return Voice
}
