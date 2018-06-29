module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    // クライアント側と定数を一致させる or サーバ側で文字列 - 数値変換
    boxType: DataTypes.INTEGER,
    posterId: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    // 現状VOICEでは必要ないけど、無駄にテーブル増やしたくないのであえて正規化しない
    categoryIndex: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    like: DataTypes.INTEGER,
    comment: DataTypes.INTEGER
  })
  return Post
}
