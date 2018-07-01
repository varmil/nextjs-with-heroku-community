module.exports = function(sequelize, DataTypes) {
  var PostHashtag = sequelize.define(
    'PostHashtag',
    {
      postId: DataTypes.INTEGER,
      hashtagId: DataTypes.INTEGER
    },
    {
      tableName: 'PostsHashtags'
    }
  )
  return PostHashtag
}
