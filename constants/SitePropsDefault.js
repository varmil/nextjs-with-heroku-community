import range from 'lodash/range'
import Color from 'constants/Color'

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

export const Boxes = [
  {
    id: '', // サーバで管理しているスレッドID（URLに使う？）
    type: '', // TALK or SURVEY or REVIEW
    index: 0,
    header: {
      defaultText: 'トークルーム', // use after box adding
      contentState: null, // draft-js
      src: '', // 背景画像ソース
      backgroundColor: '#333'
    },
    contents: [
      /* 投稿内容。TOPに必要な分だけ */
    ]
  },
  {
    id: '',
    type: '',
    index: 0,
    header: {
      defaultText: '企業発信',
      contentState: null,
      src: '',
      backgroundColor: '#333'
    },
    contents: []
  }
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
