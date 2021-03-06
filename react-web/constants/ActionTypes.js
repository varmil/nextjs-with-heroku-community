import { createTypes, async } from './redux-action-types'

// -----
// -- SITE: BrandごとにEditできるレイアウト情報 --
// -----
// まるごと state.site 保存 / ロード
export const SiteState = createTypes(
  'site/state/',
  'SET',
  async('FETCH'),
  async('SAVE')
)

// 不要かも？ PC, Tablet, Mobile 切り替え
export const SitePreview = createTypes('site/preview/', 'SET_DEVICE')

// （Edit, View）全ページ共通で使用するデータ
export const SiteCommon = createTypes(
  'site/common/',
  'SET_LOGO',
  'SET_NAV_ICON_COLOR',
  'SET_BG_COLOR',
  'SET_FONT_FAMILY'
)

export const SiteTop = createTypes('site/top/', 'SET_MAIN_BANNER', 'SET_BOXES')

export const SiteWelcome = createTypes('site/welcome/', 'SET_WELCOME')

export const SiteTalkRoom = createTypes(
  'site/talk/',
  'SET_CATEGORIES',
  'SET_SUB_BANNER',
  async('FETCH')
)

export const SiteNews = createTypes(
  'site/news/',
  'SET_CATEGORIES',
  'SET_SUB_BANNER'
)

// (Edit) iframe
export const IFrame = createTypes('iframe/', 'POST_MESSAGE')

// -----
// -- APP: ユーザViewで詰めるデータ --
// -----
export const AppBox = createTypes('app/box/', 'PREPEND_CONTENT')

// ページングにも使う
export const AppTalkRoom = createTypes(
  'app/talk/',
  'ADD_CONTENTS',
  'RESET_CONTENTS',
  'SET_ACTIVE_CATEGORY',
  async('FETCH')
)

export const AppVoice = createTypes(
  'app/voice/',
  'ADD_CONTENTS',
  async('FETCH')
)

export const AppNews = createTypes(
  'app/news/',
  'ADD_CONTENTS',
  'RESET_CONTENTS',
  'SET_ACTIVE_CATEGORY',
  async('FETCH')
)

export const AppMypage = createTypes(
  'app/mypage/',
  'ADD_CONTENTS',
  'RESET_CONTENTS',
  async('FETCH'),

  // 他人
  'SET_OTHER_USER',
  async('FETCH_OTHER_USER')
)

// 検索画面
export const AppSearch = createTypes(
  'app/search/',
  // 検索結果をつめる, RESET
  'ADD_CONTENTS',
  'ADD_PHOTOS',
  'RESET_CONTENTS',
  'RESET_PHOTOS',
  // 検索結果を取得
  async('FETCH')
)

// 通知画面
export const AppNotification = createTypes(
  'app/notification/',
  'ADD_CONTENTS',
  'SET_NOT_READ_COUNT',
  'UPDATE_READ',
  async('FETCH'),
  async('FETCH_NOT_READ_COUNT'),
  async('UPDATE_READ')
)

// POST詳細画面
export const AppPost = createTypes(
  'app/post/',
  'SET_POST',
  'DELETE_POST',
  // コメント投稿直後にFetchする際に使用
  'PREPEND_COMMENT',
  'SET_COMMENTS',
  'PUSH_COMMENTS',
  'DELETE_COMMENT',
  // ユーザアクション後、ローカル反映用
  'INCREMENT_VOTE_SUM',
  'INCREMENT_LIKE_SUM',
  'INCREMENT_COMMENT_SUM',
  'DECREMENT_COMMENT_SUM',
  // 新規投稿
  async('SAVE'),
  // 削除
  async('DELETE'),
  // 新規コメント
  async('SAVE_COMMENT'),
  // コメント削除
  async('DELETE_COMMENT'),
  // いいね
  async('SAVE_LIKE'),
  // 投票
  async('SAVE_VOTE'),
  // 下書き or 編集時のデータ取得
  async('FETCH'),
  // コメント取得
  async('FETCH_COMMENTS')
)

// バッジ
export const AppBadge = createTypes(
  'app/badge/',
  'SET_LIST',
  async('FETCH_LIST')
)

// お問い合わせ
export const AppContact = createTypes('app/contact/', async('SAVE'))

// -----
// -- APP_ADMIN: AdminViewで詰めるデータ --
// -----

// /admin/post （UserViewとは扱う情報が微妙に違うかもなので分ける）
export const AppAdminPost = createTypes(
  'app/admin/post/',
  // 新規投稿
  async('SAVE'),
  // 下書き or 編集時のデータ取得
  async('FETCH'),
  'SET',
  // 一覧表示用
  async('FETCH_LIST'),
  'SET_LIST',
  'PUSH_LIST'
)

// /admin/fans （ファン管理）
export const AppAdminFan = createTypes(
  'app/admin/fan/',
  // 一覧表示用
  async('FETCH_LIST'),
  'SET_LIST',
  // 招待ファン
  async('SAVE_INVITATION'),
  async('FETCH_INVITATION_LIST'),
  'SET_INVITATION_LIST'
)

// 管理者一覧とか追加とか更新とか
export const AppAdminAccount = createTypes(
  'app/admin/account/',
  // 一覧表示用
  async('FETCH_LIST'),
  'SET_LIST',
  // 編集用
  async('FETCH_OTHER_ADMIN'),
  'SET_OTHER_ADMIN',
  // 追加
  async('SAVE')
)

// サイト編集に使うライブラリ画像
export const AppAdminLibrary = createTypes(
  'app/admin/library/',
  // 一覧表示用
  async('FETCH_LIST'),
  'SET_LIST',
  // 追加
  async('SAVE')
)

// -----
// -- USER: ユーザ情報 --
// -----
export const User = createTypes(
  'user/',
  'AUTHENTICATE',
  'DEAUTHENTICATE',
  // user
  async('SIGNUP'),
  async('SIGNIN'),
  async('SAVE_PROFILE'),
  async('UPDATE_LOGINED_AT'),
  async('FETCH_CODE_INFO'), // invitation code
  // admin
  async('AUTH_ADMIN'),
  // fetch basic info (id, nickname)
  async('FETCH'),
  'SET'
)

/**
 * 汎用SuccessR用Action
 */
export const AppSuccesses = createTypes('successes/', 'PUSH', 'POP')

/**
 * 汎用ERROR用Action
 */
export const AppErrors = createTypes('errors/', 'PUSH', 'POP')

/**
 * 汎用Loading用Action
 */
export const Loading = createTypes(
  'loading',
  'INCREMENT_REQUEST_COUNT',
  'DECREMENT_REQUEST_COUNT',
  'SUCCESS',
  'FAILED'
)

/*
  types = {
    LOAD_REQUEST: 'my-app/module/LOAD_REQUEST',
    LOAD_SUCCESS: 'my-app/module/LOAD_SUCCESS',
    LOAD_FAILED: 'my-app/module/LOAD_FAILED',
    SAVE_REQUEST: 'my-app/module/SAVE_REQUEST',
    SAVE_SUCCESS: 'my-app/module/SAVE_SUCCESS',
    SAVE_FAILED: 'my-app/module/SAVE_FAILED',
    UPDATE_REQUEST: 'my-app/module/UPDATE_REQUEST',
    UPDATE_SUCCESS: 'my-app/module/UPDATE_SUCCESS',
    UPDATE_FAILED: 'my-app/module/UPDATE_FAILED',
    REMOVE_REQUEST: 'my-app/module/REMOVE_REQUEST',
    REMOVE_SUCCESS: 'my-app/module/REMOVE_SUCCESS',
    REMOVE_FAILED: 'my-app/module/REMOVE_FAILED'
  }
*/
