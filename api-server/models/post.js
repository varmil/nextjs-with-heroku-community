module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    // クライアント側と定数を一致させる or サーバ側で文字列 - 数値変換
    boxType: DataTypes.INTEGER,
    posterId: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    like: DataTypes.INTEGER,
    comment: DataTypes.INTEGER
  })
  return Post
}
