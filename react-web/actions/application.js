import { createAction } from 'redux-actions'
import isString from 'lodash/isString'
import {
  AppTalkRoom,
  AppVoice,
  AppNews,
  AppMypage,
  AppPost,
  AppErrors
} from 'constants/ActionTypes'

import { toastr } from 'react-redux-toastr'

// talk room
export let addTalkContents = createAction(AppTalkRoom.ADD_CONTENTS)

// voice
export let addVoiceContents = createAction(AppVoice.ADD_CONTENTS)

// news
export let addNewsContents = createAction(AppNews.ADD_CONTENTS)

// mypage
export let addMypageContents = createAction(AppMypage.ADD_CONTENTS)

// post
export let setPost = createAction(AppPost.SET_POST)

// 汎用エラー
export let setCommonError = createAction(AppErrors.PUSH, e => {
  // NOTE: passportで401等が返ってくる場合jsonではないので注意
  console.warn(e)
  let message = '不明なエラーが発生しました。時間を置いて再度お試しください'

  // サーバ側でエラーがあると、基本的にはこの形式
  if (e.data && e.data.error) message = e.data.error
  console.log(message)
  // passportのデフォルトエラーは文字列
  if (isString(e.data)) message = e.data
  console.log(message)
  // カスタムメッセージ
  if (isString(e)) message = e
  console.log(message)

  toastr.error('エラー', message)
})
