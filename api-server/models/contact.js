module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define('Contact', {
    // 種別
    type: DataTypes.INTEGER,
    // お問い合わせ対象ブランド、お問い合わせしたユーザ
    brandId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    // 本文
    text: DataTypes.TEXT
  })
  return Contact
}
