const reqlib = require('app-root-path').require
const _ = require('lodash')
const UserService = reqlib('/services/User')
const models = reqlib('/models')
const Path = reqlib('/constants/Path')
const Role = reqlib('/constants/Role')

const PER_PAGE = 3

module.exports = class Comment {
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
      return merged.reverse()
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
