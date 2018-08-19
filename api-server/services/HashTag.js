const reqlib = require('app-root-path').require
const _ = require('lodash')
const hashtagRegex = require('hashtag-regex')
const models = reqlib('/models')

/**
 * Tagの管理用service
 */
module.exports = class HashTag {
  /**
   * 記事本文からHashtag情報を解析し、Hashtagテーブルに保存
   * @param {*} tags
   * @param {*} transaction
   */
  static async upsert(tags, transaction) {
    // 既存タグ
    const existingTags = await models.Hashtag.findAll({
      where: { name: tags }
    })
    const existingTagIds = _.map(existingTags, 'id')
    // console.log('existingTagIds', existingTagIds)

    // 新規タグ（入力タグから、既存タグの差をとったものを新規とみなす）
    const newTagNames = _.difference(tags, _.map(existingTags, 'name'))
    const newTagRows = await models.Hashtag.bulkCreate(
      newTagNames.map(str => {
        return { name: str }
      }),
      {
        raw: true,
        transaction
      }
    )
    const newTagsIds = _.map(newTagRows, 'id')

    return [...existingTagIds, ...newTagsIds]
  }

  /**
   * bodyに含まれている # から始まる 文字列のリストを取得
   * # から始まって （半角|全角）スペース で終わる文字列をハッシュタグとして認識する
   * @param {String} body
   * @returns {Array<String>} タグリスト
   */
  static findTagsFrom(text) {
    let result = []
    const regex = hashtagRegex()

    let match
    while ((match = regex.exec(text))) {
      // # 記号は省く
      result.push(match[0].replace('#', ''))
    }

    return _.uniq(result)
  }

  /**
   * TagとPostの紐づけ
   * @param {int} postId
   * @param {Array<int>} tagIds
   * @param {*} transaction
   */
  static async updatePostHashtag(postId, tagIds, transaction) {
    // まず既存のタグ関係を削除
    await models.PostHashtag.destroy({ where: { postId } }, { transaction })
    // その後INSERT
    const data = tagIds.map(tagId => {
      return {
        postId,
        tagId
      }
    })
    await models.PostHashtag.bulkCreate(data, { transaction })
  }

  /**
   * CommentとTagの紐づけ
   * @param {int} commentId
   * @param {Array<int>} tagIds
   * @param {*} transaction
   */
  static async updateCommentHashtag(commentId, tagIds, transaction) {
    // まず既存のタグ関係を削除
    await models.CommentHashtag.destroy({ where: { postId } }, { transaction })
    // その後INSERT
    const data = tagIds.map(tagId => {
      return {
        commentId,
        tagId
      }
    })
    await models.CommentHashtag.bulkCreate(data, { transaction })
  }

  /**
   * タグからPostIdsを取得する
   * @param {string} name
   * @returns {Array<int>} postIds
   */
  static async fetchPostIds(name) {
    const tags = await models.Hashtag.findAll({ where: { name }, raw: true })
    const tagIds = _.map(tags, 'id')
    const postsTags = await models.PostHashtag.findAll({
      where: { hashtagId: tagIds },
      raw: true
    })
    return _.uniq(_.map(postsTags, 'postId'))
  }

  /**
   * タグが使われているコメントのIDのリストを取得
   * @param {string} name
   * @returns {Array<int>} commentIds
   */
  static async fetchCommentIds(name) {
    const tags = await models.Hashtag.findAll({ where: { name }, raw: true })
    const tagIds = _.map(tags, 'id')
    const commentTags = await models.CommentHashtag.findAll({
      where: { hashtagId: tagIds },
      raw: true
    })
    return _.uniq(_.map(commentTags, 'commentId'))
  }
}
