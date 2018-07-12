// postId, userId --> UNIQUE
module.exports = function(sequelize, DataTypes) {
  const PostLike = sequelize.define('PostLike', {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    userId: DataTypes.INTEGER,
    // いいねしてたらTRUE
    upOrDown: DataTypes.BOOLEAN
  })
  return PostLike
}
