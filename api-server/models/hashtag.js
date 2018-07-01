module.exports = function(sequelize, DataTypes) {
  const Hashtag = sequelize.define('Hashtag', {
    // NOTE: #は除く
    name: DataTypes.STRING
  })
  return Hashtag
}
