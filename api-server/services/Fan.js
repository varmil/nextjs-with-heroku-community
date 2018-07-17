const reqlib = require('app-root-path').require
const _ = require('lodash')
const UserService = reqlib('/services/User')
const models = reqlib('/models')
const Path = reqlib('/constants/Path')
const Role = reqlib('/constants/Role')
const BoxType = reqlib('/../shared/constants/BoxType')

// リストで取得する際に、1ページあたりの初期値
// パラメタによって指定した場合はこの値は無効
const DEFAULT_PER_PAGE = 20

module.exports = class Fan {
  static async fetchList(pageNum, where, options = {}) {
    // optionsを展開
    let { perPage, userId, assoc } = options
    perPage = +perPage || DEFAULT_PER_PAGE

    // 特定条件なら関連テーブルも引っ張る
    let include = []
    if (assoc || (where && where.boxType === BoxType.index.voice)) {
      include.push({
        model: models.Voice,
        attributes: ['options', 'deadline', 'count']
      })
    }
    if (assoc && userId) {
      // 自分がそのPostにLike済みか PostLike: [] or [{ upOrDown: true or false }]
      include.push({
        model: models.PostLike,
        attributes: ['upOrDown'],
        where: { userId },
        required: false
      })
    }

    try {
      const posts = await models.Post.findAll({
        where: where,
        limit: perPage,
        offset: perPage * (pageNum - 1),
        order: [['id', 'DESC']],
        include
      })
      const plainPosts = posts.map(e => e.get({ plain: true }))
      return await Post.associateWithUser(plainPosts)
    } catch (e) {
      console.error(e)
    }
  }

  // NOTE: mutate original posts
  // postIdsをもとに表示するのに必要なユーザ情報を追加
  static async associateWithUser(posts) {
    const names = await UserService.fetchAllObj(_.map(posts, 'posterId'))
    const merged = posts.map(p => {
      const { name, iconPath } = names[p.posterId]
      return { ...p, name, iconPath }
    })
    return merged
  }
}
