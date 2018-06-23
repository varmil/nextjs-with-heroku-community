module.exports = function(sequelize, DataTypes) {
  const Brand = sequelize.define('Brand', {
    // NOTE: companyId みたいなやつがいるかも
    name: DataTypes.STRING
  })
  return Brand
}
