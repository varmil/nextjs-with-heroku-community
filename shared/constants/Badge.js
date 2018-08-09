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

const Badge = {
  [BadgeType.CONTINUOUS_LOGIN]: {
    desc: '連続ログイン（日）',
    items: [
      { level: 1, value: 7, color: Color.BRONZE },
      { level: 2, value: 14, color: Color.BRONZE },
      { level: 3, value: 30, color: Color.BRONZE },
      { level: 4, value: 45, color: Color.SILVER },
      { level: 5, value: 60, color: Color.SILVER },
      { level: 6, value: 90, color: Color.GOLD }
    ]
  },
  [BadgeType.LIKE]: {
    desc: 'いいねをする',
    items: [
      { level: 1, value: 1, color: Color.BRONZE },
      { level: 2, value: 50, color: Color.BRONZE },
      { level: 3, value: 300, color: Color.BRONZE },
      { level: 4, value: 500, color: Color.SILVER },
      { level: 5, value: 1000, color: Color.SILVER },
      { level: 6, value: 2000, color: Color.GOLD }
    ]
  }
}

module.exports = { BadgeType, Color, Badge }
