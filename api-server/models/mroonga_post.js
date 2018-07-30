const _ = require('lodash')

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

  MroongaPost.findPostIds = async word => {
    try {
      const select = `SELECT postId FROM ${MroongaPost.tableName}`
      const against = `against("+${word}" IN BOOLEAN MODE)`
      const option = { type: sequelize.QueryTypes.SELECT }

      const results0 = await sequelize.query(
        `${select} WHERE match(title, body) ${against};`,
        option
      )
      const results1 = await sequelize.query(
        `${select} WHERE match(tags) ${against};`,
        option
      )

      return _.uniq([
        ..._.map(results0, 'postId'),
        ..._.map(results1, 'postId')
      ])
    } catch (e) {
      throw e
    }
  }

  return MroongaPost
}
