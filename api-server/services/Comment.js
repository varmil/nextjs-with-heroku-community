const reqlib = require('app-root-path').require
const _ = require('lodash')
const UserService = reqlib('/services/User')
const models = reqlib('/models')
const Path = reqlib('/constants/Path')
const Role = reqlib('/constants/Role')

const PER_PAGE = 5

module.exports = class Comment {
  static async save(postId, userId, body) {
    const transaction = await models.sequelize.transaction()
    try {
      const comment = await models.Comment.create(
        {
          postId,
          commenterId: userId,
          body
        },
        { transaction }
      )

      await models.Post.update(
        { comment: models.sequelize.literal('comment + 1') },
        { where: { id: postId } },
        { transaction }
      )

      const merged = (await Comment.associateWithUser([comment.dataValues]))[0]
      return merged
    } catch (e) {
      console.error(e)
    }
  }

  static async fetchList(pageNum, where) {
    try {
      const comments = await models.Comment.findAll({
        where: where,
        limit: PER_PAGE,
        offset: PER_PAGE * (pageNum - 1),
        order: [['id', 'DESC']],
        raw: true
      })
      const merged = await Comment.associateWithUser(comments)
      return merged
    } catch (e) {
      console.error(e)
    }
  }

  // NOTE: mutate original comments
  // postIdsをもとに表示するのに必要なユーザ情報を追加
  static async associateWithUser(comments) {
    const names = await UserService.fetchAllObj(_.map(comments, 'commenterId'))
    const merged = comments.map(c => {
      const { name, iconPath } = names[c.commenterId]
      return { ...c, name, iconPath }
    })
    return merged
  }
}
