module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
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
