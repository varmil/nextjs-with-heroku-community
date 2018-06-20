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
  header: {
    defaultText: 'トークルーム', // use after box adding
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
    header: { defaultText: { $set: 'TALK ROOM' } }
  }),
  update(boxesBase[1], {
    header: { defaultText: { $set: 'YOUR VOICE' } }
  }),
  update(boxesBase[2], {
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
    '{"blocks":[{"key":"a5fvj","text":"             Welcome to\\n    SAMPLE\\n        FAN\\nCOMMUNITY\\n                          Update your lifestyle","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":104,"style":"ITALIC"},{"offset":0,"length":57,"style":"color-rgb(239,239,239)"},{"offset":83,"length":21,"style":"color-rgb(239,239,239)"},{"offset":0,"length":24,"style":"fontsize-24"},{"offset":24,"length":33,"style":"fontsize-48"},{"offset":57,"length":26,"style":"fontsize-14"},{"offset":83,"length":21,"style":"fontsize-12"}],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{}}',
  src: '/static/img/welcome-bg.png',
  backgroundColor: '#f5f5f5'
}
