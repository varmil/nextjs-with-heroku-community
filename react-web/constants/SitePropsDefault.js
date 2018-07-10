import range from 'lodash/range'
import Color from 'constants/Color'
import URL from 'constants/URL'
import update from 'immutability-helper'
import BoxType from '/../shared/constants/BoxType'

const MAX_CATEGORIES_NUM = 10
const DEFAULT_CAT_INDEX = 9

export const Logo = {
  src: '/static/stub/logo-blue.png'
}

export const NavIconColorDefault = {
  color: '#4B4B4B'
}

// export const MenuBarPC = {
//   style: {
//     color: '#333',
//     backgroundColor: '#fff',
//     textAlign: 'left'
//   },
//   item: [
//     {
//       index: 0,
//       text: 'トークルーム',
//       href: ''
//     },
//     {
//       index: 1,
//       text: '企業発信',
//       href: ''
//     },
//     {
//       index: 2,
//       text: '企業ストーリー',
//       href: ''
//     },
//     {
//       index: 3,
//       text: '投票・アンケート',
//       href: ''
//     },
//     {
//       index: 4,
//       text: 'お知らせ',
//       href: ''
//     }
//   ]
// }

export const MenuBar = {
  style: {
    color: '#fff',
    backgroundColor: '#000'
  }
}

export const ColorDefault = {
  backgroundColor: 'red'
}

export const MainBanner = [
  {
    index: 0,
    contentState: null,
    src: 'https://dummyimage.com/1140x220/000/fff.png',
    backgroundColor: '#fff',
    href: ''
  }
]

const boxesBase = range(3).map(i => ({
  id: '', // サーバで管理しているスレッドID（URLに使う？）
  type: '', // int: TALK or VOICE or NEWS or EVENT
  index: i,
  slug: '', // （固定の）URLパス。これでselected判定など行う
  header: {
    text: ''
  },
  contents: [
    /* 投稿内容。TOPに必要な分だけ */
  ]
}))
export const Boxes = {
  item: [
    update(boxesBase[0], {
      type: { $set: BoxType.index.talk },
      slug: { $set: URL.TALK_SLUG },
      header: { text: { $set: 'TALK' } }
    }),
    update(boxesBase[1], {
      type: { $set: BoxType.index.voice },
      slug: { $set: URL.VOICE_SLUG },
      header: { text: { $set: 'VOICE' } }
    }),
    update(boxesBase[2], {
      type: { $set: BoxType.index.news },
      slug: { $set: URL.NEWS_SLUG },
      header: { text: { $set: 'NEWS' } }
    })
    // update(boxesBase[3], {
    //   type: { $set: BoxType.index.event },
    //   slug: { $set: URL.EVENT_SLUG },
    //   header: { text: { $set: 'EVENT' } }
    // })
  ]
}

export const SubBanner = range(1).map(i => ({
  index: i,
  contentState: null,
  src: 'https://dummyimage.com/500x180/000/fff.png',
  backgroundColor: '#fff',
  href: ''
}))

// export const Footer = {
//   style: {
//     color: '#fff',
//     backgroundColor: Color.MAIN_BLUE,
//     textAlign: 'center'
//   },
//   item: [
//     {
//       index: 0,
//       text: 'トークルーム',
//       href: ''
//     },
//     {
//       index: 1,
//       text: '企業発信',
//       href: ''
//     },
//     {
//       index: 2,
//       text: '企業ストーリー',
//       href: ''
//     },
//     {
//       index: 3,
//       text: '投票・アンケート',
//       href: ''
//     },
//     {
//       index: 4,
//       text: 'お知らせ',
//       href: ''
//     }
//   ]
// }

/**
 * WELCOME
 */
export const Welcome = {
  contentState:
    '{"blocks":[{"key":"a5fvj","text":"              Welcome to\\n       SAMPLE\\n       FAN\\nCOMMUNITY\\n                 Update your lifestyle","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":98,"style":"ITALIC"},{"offset":0,"length":98,"style":"color-rgb(239,239,239)"},{"offset":0,"length":31,"style":"fontsize-24"},{"offset":0,"length":98,"style":"fontfamily-Dancing Script"},{"offset":31,"length":32,"style":"fontsize-48"},{"offset":63,"length":17,"style":"fontsize-14"},{"offset":80,"length":18,"style":"fontsize-12"}],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{}}',
  src: '/static/img/welcome-bg.png',
  backgroundColor: '#f5f5f5'
}

/**
 * TALK ROOM
 */
export const TalkRoomDescDefault = {
  text:
    'コーディネートから新アイテムまで服の話題を中心に気軽に会話のできる場所です。'
}

export const TalkRoomInputFormDefault = {
  text: '話題を投稿 / 質問してみましょう！'
}

const talkRoomCat = range(MAX_CATEGORIES_NUM).map(i => ({
  categoryIndex: i, // 0 - 9 この番号で管理する
  text: i === DEFAULT_CAT_INDEX ? 'フリートーク' : '', // index9はフリートークで固定
  editable: i !== DEFAULT_CAT_INDEX
}))
export const TalkRoomCategoriesDefault = {
  item: talkRoomCat
}

/**
 * NEWS（Input Formがない点に注意）
 */
export const NewsDescDefault = {
  text: 'Sample からのお知らせやニュースをシェアさせていただく場です！'
}

// Talk Roomとキーを合わせること
const newsCat = range(MAX_CATEGORIES_NUM).map(i => ({
  categoryIndex: i,
  text: i === DEFAULT_CAT_INDEX ? 'その他' : '', // index9はその他で固定
  editable: i !== DEFAULT_CAT_INDEX
}))
export const NewsCategoriesDefault = {
  item: newsCat
}
