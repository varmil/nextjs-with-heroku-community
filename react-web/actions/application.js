import { createAction } from 'redux-actions'
import {
  AppTalkRoom,
  AppVoice,
  AppNews,
  AppMypage,
  AppPost,
  AppErrors
} from 'constants/ActionTypes'

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
  // 適当にPOP（エラーメッセージが自動で消えるように）
  // setTimeout(() => {
  // }, 2000)
  return e
})
