// postId, userId --> UNIQUE
module.exports = function(sequelize, DataTypes) {
  const PostLike = sequelize.define('PostLike', {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    // いいねしてたらTRUE
    upOrDown: DataTypes.BOOLEAN
  })
  return PostLike
}
