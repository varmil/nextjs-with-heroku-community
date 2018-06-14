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

export const MenuBar = {
  style: {
    color: '#333',
    backgroundColor: '#fff',
    textAlign: 'left'
  },
  item: [
    {
      id: 'memuItemDefault_1',
      index: 0,
      text: 'トークルーム',
      href: ''
    },
    {
      id: 'memuItemDefault_2',
      index: 1,
      text: '企業発信',
      href: ''
    },
    {
      id: 'memuItemDefault_3',
      index: 2,
      text: '企業ストーリー',
      href: ''
    },
    {
      id: 'memuItemDefault_4',
      index: 3,
      text: '投票・アンケート',
      href: ''
    },
    {
      id: 'memuItemDefault_5',
      index: 4,
      text: 'お知らせ',
      href: ''
    }
  ]
}

export const MainBanner = {
  item: [
    {
      index: 0,
      src: 'https://dummyimage.com/1140x220/000/fff.png',
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
      src: '/static/stub/logo-white.png' // 背景画像ソース
    },
    contents: [
      /* 投稿内容。TOPに必要な分だけ */
    ]
  }
]

export const SubBanner = {
  item: range(4).map(i => ({
    index: i,
    src: 'https://dummyimage.com/500x180/000/fff.png',
    href: ''
  }))
}
