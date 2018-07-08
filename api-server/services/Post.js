const reqlib = require('app-root-path').require
const _ = require('lodash')
const models = reqlib('/models')
const moveFile = require('move-file')
const Path = reqlib('/constants/Path')
const Role = reqlib('/constants/Role')

module.exports = class Post {
  // 投稿画像を一括して移動
  static async moveProfileIcon(files) {
    if (Array.isArray(files)) {
      const promises = files.map(async file => {
        const { path, filename } = file
        const dbPath = `${Path.POST_IMG_DIR}/${filename}`
        const fullPath = `${Path.STATIC_BASE_DIR}${dbPath}`
        await moveFile(path, fullPath)
        return dbPath
      })
      return Promise.all(promises)
    } else {
      return []
    }
  }

  static async save(
    userId,
    brandId,
    boxType,
    released,
    title,
    body,
    categoryIndex,
    files,
    fromServerFiles,
    trans
  ) {
    try {
      let data = {
        brandId,
        boxType,
        released,
        posterId: userId,
        title,
        body
      }
      // optional params
      if (categoryIndex) {
        data = { ...data, categoryIndex }
      }
      // save images if needed (union)
      const newImages = await Post.moveProfileIcon(files)
      data = { ...data, images: _.union(fromServerFiles, newImages) }

      const post = await models.Post.create(data, {
        transaction: trans
      })

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
