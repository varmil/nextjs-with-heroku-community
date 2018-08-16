module.exports = function(sequelize, DataTypes) {
  var CommentHashtag = sequelize.define(
    'CommentHashtag',
    {
      commentId: DataTypes.INTEGER,
      hashtagId: DataTypes.INTEGER
    },
    {
      tableName: 'CommentHashtags'
    }
  )
  return CommentHashtag
}
