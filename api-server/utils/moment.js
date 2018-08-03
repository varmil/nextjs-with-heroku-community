const moment = require('moment')

// 現在時刻と比較して、XX時間前、など取得
const getMomentDiffAgo = timestamp => {
  const diff = moment().diff(timestamp)
  const duration = moment.duration(diff)
  switch (true) {
    case duration.years() > 0:
      return duration.years() + '年前'
    case duration.months() > 0:
      return duration.months() + 'ヶ月前'
    case duration.weeks() > 0:
      return duration.weeks() + '週間前'
    case duration.days() > 0:
      return duration.days() + '日前'
    case duration.hours() > 0:
      return duration.hours() + '時間前'
    case duration.minutes() > 0:
      return duration.minutes() + '分前'
    default:
      return duration.seconds() + '秒前'
  }
}

module.exports = { getMomentDiffAgo }
