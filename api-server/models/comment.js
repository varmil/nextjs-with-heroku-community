module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    postId: DataTypes.INTEGER,
    commenterId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  })
  return Comment
}
