import range from 'lodash/range'
import Color from 'constants/Color'
import update from 'immutability-helper'

export const Logo = {
  src: '/static/stub/logo-blue.png'
}

export const AccountIcon = {
  color: Color.MAIN_BLUE
}

export const NotificationIcon = {
  color: Color.MAIN_BLUE
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

export const MainBanner = {
  item: [
    {
      index: 0,
      contentState: null,
      src: 'https://dummyimage.com/1140x220/000/fff.png',
      backgroundColor: '#fff',
      href: ''
    }
  ]
}

const boxesBase = range(3).map(i => ({
  id: '', // サーバで管理しているスレッドID（URLに使う？）
  type: '', // TALK or SURVEY or REVIEW
  index: i,
  slug: '', // （固定の）URLパス。これでselected判定など行う
  header: {
    defaultText: '', // use after box adding
    contentState: null, // draft-js
    src: '', // 背景画像ソース
    backgroundColor: '#333'
  },
  contents: [
    /* 投稿内容。TOPに必要な分だけ */
  ]
}))
export const Boxes = [
  update(boxesBase[0], {
    slug: { $set: 'talkroom' },
    header: { defaultText: { $set: 'TALK ROOM' } }
  }),
  update(boxesBase[1], {
    slug: { $set: 'yourvoice' },
    header: { defaultText: { $set: 'YOUR VOICE' } }
  }),
  update(boxesBase[2], {
    slug: { $set: 'news' },
    header: { defaultText: { $set: 'NEWS' } }
  })
]

export const SubBanner = {
  item: range(2).map(i => ({
    index: i,
    contentState: null,
    src: 'https://dummyimage.com/500x180/000/fff.png',
    backgroundColor: '#f5f5f5',
    href: ''
  }))
}

export const Footer = {
  style: {
    color: '#fff',
    backgroundColor: Color.MAIN_BLUE,
    textAlign: 'center'
  },
  item: [
    {
      index: 0,
      text: 'トークルーム',
      href: ''
    },
    {
      index: 1,
      text: '企業発信',
      href: ''
    },
    {
      index: 2,
      text: '企業ストーリー',
      href: ''
    },
    {
      index: 3,
      text: '投票・アンケート',
      href: ''
    },
    {
      index: 4,
      text: 'お知らせ',
      href: ''
    }
  ]
}

export const Welcome = {
  contentState:
    '{"blocks":[{"key":"a5fvj","text":"                 Welcome to\\n    SAMPLE\\n        FAN\\nCOMMUNITY\\n                                Update your lifestyle","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":114,"style":"ITALIC"},{"offset":0,"length":61,"style":"color-rgb(239,239,239)"},{"offset":93,"length":21,"style":"color-rgb(239,239,239)"},{"offset":0,"length":28,"style":"fontsize-24"},{"offset":0,"length":114,"style":"fontfamily-Monotype Corsiva"},{"offset":28,"length":33,"style":"fontsize-48"},{"offset":61,"length":32,"style":"fontsize-14"},{"offset":93,"length":21,"style":"fontsize-12"}],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{}}',
  src: '/static/img/welcome-bg.png',
  backgroundColor: '#f5f5f5'
}
