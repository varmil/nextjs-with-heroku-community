module.exports = function(sequelize, DataTypes) {
  const MroongaPost = sequelize.define(
    'MroongaPost',
    {
      postId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
      body: DataTypes.TEXT,
      tags: DataTypes.TEXT
    },
    {
      timestamps: false
    }
  )
  return MroongaPost
}
