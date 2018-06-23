module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    postId: DataTypes.INTEGER,
    commenterId: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    body: DataTypes.TEXT
  })
  return Comment
}
