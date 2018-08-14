const BadgeType = {
  CONTINUOUS_LOGIN: 0,
  LIKE: 1,
  COMMENT: 2,
  SURVEY: 3,
  POST: 4,
  PHOTO: 5,
  MOVIE: 6,
  GET_LIKE: 7,
  GET_COMMENT: 8
}

const Color = {
  BRONZE: 0,
  SILVER: 1,
  GOLD: 2
}

// 条件達成判定を楽にするため items は level 高い順に定義
const Badge = {
  [BadgeType.CONTINUOUS_LOGIN]: {
    desc: '連続ログイン（日）',
    imgname: 'continuous-login-',
    items: [
      { level: 6, value: 90, color: Color.GOLD },
      { level: 5, value: 60, color: Color.SILVER },
      { level: 4, value: 45, color: Color.SILVER },
      { level: 3, value: 30, color: Color.BRONZE },
      { level: 2, value: 14, color: Color.BRONZE },
      { level: 1, value: 7, color: Color.BRONZE }
    ]
  },
  [BadgeType.LIKE]: {
    desc: 'いいね',
    imgname: 'like-',
    items: [
      { level: 6, value: 2000, color: Color.GOLD },
      { level: 5, value: 1000, color: Color.SILVER },
      { level: 4, value: 500, color: Color.SILVER },
      { level: 3, value: 300, color: Color.BRONZE },
      { level: 2, value: 50, color: Color.BRONZE },
      { level: 1, value: 1, color: Color.BRONZE }
    ]
  },
  [BadgeType.COMMENT]: {
    desc: 'コメント',
    imgname: 'comment-',
    items: [
      { level: 6, value: 500, color: Color.GOLD },
      { level: 5, value: 300, color: Color.SILVER },
      { level: 4, value: 100, color: Color.SILVER },
      { level: 3, value: 20, color: Color.BRONZE },
      { level: 2, value: 10, color: Color.BRONZE },
      { level: 1, value: 1, color: Color.BRONZE }
    ]
  },
  [BadgeType.SURVEY]: {
    desc: 'アンケート回答',
    imgname: 'survey-',
    items: [
      { level: 6, value: 50, color: Color.GOLD },
      { level: 5, value: 30, color: Color.SILVER },
      { level: 4, value: 20, color: Color.SILVER },
      { level: 3, value: 10, color: Color.BRONZE },
      { level: 2, value: 5, color: Color.BRONZE },
      { level: 1, value: 1, color: Color.BRONZE }
    ]
  },
  [BadgeType.POST]: {
    desc: '累積投稿',
    imgname: 'post-',
    items: [
      { level: 6, value: 300, color: Color.GOLD },
      { level: 5, value: 100, color: Color.SILVER },
      { level: 4, value: 50, color: Color.SILVER },
      { level: 3, value: 30, color: Color.BRONZE },
      { level: 2, value: 10, color: Color.BRONZE },
      { level: 1, value: 1, color: Color.BRONZE }
    ]
  },
  [BadgeType.PHOTO]: {
    desc: '写真投稿',
    imgname: 'photo-',
    items: [
      { level: 6, value: 100, color: Color.GOLD },
      { level: 5, value: 50, color: Color.SILVER },
      { level: 4, value: 30, color: Color.SILVER },
      { level: 3, value: 10, color: Color.BRONZE },
      { level: 2, value: 5, color: Color.BRONZE },
      { level: 1, value: 1, color: Color.BRONZE }
    ]
  },
  [BadgeType.MOVIE]: {
    desc: '動画投稿',
    imgname: 'movie-',
    items: [
      { level: 6, value: 80, color: Color.GOLD },
      { level: 5, value: 40, color: Color.SILVER },
      { level: 4, value: 20, color: Color.SILVER },
      { level: 3, value: 10, color: Color.BRONZE },
      { level: 2, value: 5, color: Color.BRONZE },
      { level: 1, value: 1, color: Color.BRONZE }
    ]
  },
  [BadgeType.GET_LIKE]: {
    desc: '累積獲得いいね',
    imgname: 'get-like-',
    items: [
      { level: 6, value: 1000, color: Color.GOLD },
      { level: 5, value: 400, color: Color.SILVER },
      { level: 4, value: 200, color: Color.SILVER },
      { level: 3, value: 100, color: Color.BRONZE },
      { level: 2, value: 50, color: Color.BRONZE },
      { level: 1, value: 1, color: Color.BRONZE }
    ]
  },
  [BadgeType.GET_COMMENT]: {
    desc: '累積獲得コメント',
    imgname: 'get-comment-',
    items: [
      { level: 6, value: 300, color: Color.GOLD },
      { level: 5, value: 100, color: Color.SILVER },
      { level: 4, value: 50, color: Color.SILVER },
      { level: 3, value: 30, color: Color.BRONZE },
      { level: 2, value: 10, color: Color.BRONZE },
      { level: 1, value: 1, color: Color.BRONZE }
    ]
  }
}

module.exports = { BadgeType, Color, Badge }
