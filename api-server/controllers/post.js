const _ = require('lodash')
const reqlib = require('app-root-path').require
const services = reqlib('/services')
const models = reqlib('/models')
const BoxType = reqlib('/../shared/constants/BoxType')
const Role = reqlib('/constants/Role')
const Message = reqlib('/constants/Message')

/**
 * 新規投稿 or 編集（AdminもUserもこれを使用）
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
    return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
  }

  // 通常ユーザがTALK以外へ投稿しようとしたら弾く
  if (req.user.roleId === Role.User.NORMAL && boxType !== BoxType.index.talk) {
    return res.status(422).json(Message.E_NOT_ALLOWED)
  }

  // VOICE
  const { options, deadline } = req.body
  if (boxType === BoxType.index.voice) {
    if (!options || !deadline) {
      return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)
    }
  }

  const trans = await models.sequelize.transaction()
  try {
    // 投稿をpostテーブルへ保存
    const released = true
    const post = await services.Post.save(
      userId,
      brand.id,
      boxType,
      released,
      title,
      body,
      categoryIndex,
      req.files,
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
  const { postId } = req.params
  if (!postId) return res.status(422).json(Message.E_NULL_REQUIRED_FIELD)

  let result = {}
  const post = await models.Post.findById(postId, {
    raw: true
  })
  const names = await services.User.idToName(_.map([post], 'posterId'))
  result = { ...post, name: names[post.posterId] }

  // boxTypeによって追加取得
  if (post.boxType === BoxType.index.voice) {
    const voice = await models.Voice.findOne({
      attributes: ['options', 'deadline'],
      where: { postId: post.id },
      raw: true
    })
    result = { ...result, voice }
  }

  res.json(result)
}

exports.fetchPostList = async (req, res) => {
  const PER_PAGE = 20
  const pageNum = req.params.pageNum || 1 // 1 origin
  const brandId = req.user.brand.id

  const posts = await models.Post.findAll({
    // attributes: ['id', 'name', 'title'],
    where: { brandId },
    limit: PER_PAGE,
    offset: PER_PAGE * (pageNum - 1),
    order: [['id', 'DESC']],
    raw: true
  })
  const names = await services.User.idToName(_.map(posts, 'posterId'))
  const merged = posts.map(p => {
    return { ...p, name: names[p.posterId] }
  })
  res.json(merged)
}
