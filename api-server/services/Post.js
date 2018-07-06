const reqlib = require('app-root-path').require
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const Role = reqlib('/constants/Role')

module.exports = class Post {
  static async save(
    userId,
    brandId,
    boxType,
    title,
    body,
    categoryIndex,
    trans
  ) {
    try {
      const post = await models.Post.create(
        {
          brandId,
          boxType,
          posterId: userId,
          categoryIndex,
          title,
          body
        },
        {
          transaction: trans
        }
      )
      return post
    } catch (e) {
      console.error(e)
    }
  }

  static async saveVoice(postId, options, deadline, trans) {
    try {
      const voice = await models.Voice.create(
        {
          postId,
          options,
          deadline
        },
        {
          transaction: trans
        }
      )
      return voice
    } catch (e) {
      console.error(e)
    }
  }
}
