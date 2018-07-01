module.exports = function(sequelize, DataTypes) {
  const PostLike = sequelize.define('PostLike', {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  })
  return PostLike
}
