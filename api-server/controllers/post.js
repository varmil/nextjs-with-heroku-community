const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const BoxType = reqlib('/../shared/constants/BoxType')

const E_NULL_REQUIRED_FIELD = {
  error: '項目を正しく入力してください。'
}

/**
 * 新規投稿 or 編集
 * NOTE: boxTypeやcategoryIndexは文字列なので注意
 */
exports.savePost = async (req, res, next) => {
  console.log('[profile]body', req.body)
  console.log('[profile]file', req.files)
  const { title, body } = req.body
  const boxType = +req.body.boxType
  const categoryIndex = +req.body.categoryIndex
  const userId = req.user.id
  const brand = req.user.brand

  if (boxType === undefined || !title || !body) {
    return res.status(422).json(E_NULL_REQUIRED_FIELD)
  }

  // VOICE
  const { options, deadline } = req.body
  if (boxType === BoxType.index.voice) {
    if (!options || !deadline) {
      return res.status(422).json(E_NULL_REQUIRED_FIELD)
    }
  }

  const trans = await models.sequelize.transaction()
  try {
    // 投稿をpostテーブルへ保存
    const post = await services.Post.save(
      userId,
      brand.id,
      boxType,
      title,
      body,
      categoryIndex,
      trans
    )

    // boxTypeによって、送信項目が異なるのでメソッドも変更
    switch (boxType) {
      // アンケート
      case BoxType.index.voice:
        await services.Post.saveVoice(post.id, options, deadline, trans)
        break
      // 追加項目なし
      case BoxType.index.talk:
      case BoxType.index.news:
        break
      default:
        console.warn('boxType not match, so treat as basic post', boxType)
    }

    trans.commit()
    res.json(true)
  } catch (e) {
    trans.rollback()
    return next(e)
  }
}

/**
 * 個別記事 取得
 */
exports.fetchPost = async (req, res) => {
  res.json(true)
}

exports.fetchPostList = async (req, res) => {
  res.json(true)
}
