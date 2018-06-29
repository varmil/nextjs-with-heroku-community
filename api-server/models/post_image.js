module.exports = function(sequelize, DataTypes) {
  const PostImage = sequelize.define('PostImage', {
    postId: DataTypes.INTEGER,
    path: DataTypes.BOOLEAN
  })
  return PostImage
}
