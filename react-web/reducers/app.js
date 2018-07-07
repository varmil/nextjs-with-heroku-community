import { handleActions } from 'redux-actions'
import immutable from 'object-path-immutable'
import {
  AppTalkRoom,
  AppVoice,
  AppNews,
  AppMypage,
  AppPost,
  AppAdminPost
  // AppErrors
} from 'constants/ActionTypes'

const initialState = {
  talkroom: {
    boxContents: [] // FETCH
  },

  voice: {
    boxContents: [] // FETCH
  },

  news: {
    boxContents: [] // FETCH
  },

  mypage: {
    boxContents: [] // FETCH
  },

  // Admin用。投稿一覧画面
  posts: [],

  post: {
    data: {}
  }
}

export default handleActions(
  {
    /**
     * TALK ROOM
     */
    [AppTalkRoom.ADD_CONTENTS]: (state, action) => {
      // spread payload because it is array
      return immutable.push(state, `talkroom.boxContents`, ...action.payload)
    },

    /**
     * VOICE
     */
    [AppVoice.ADD_CONTENTS]: (state, action) => {
      // spread payload because it is array
      return immutable.push(state, `voice.boxContents`, ...action.payload)
    },

    /**
     * NEWS
     */
    [AppNews.ADD_CONTENTS]: (state, action) => {
      // spread payload because it is array
      return immutable.push(state, `news.boxContents`, ...action.payload)
    },

    /**
     * MYPAGE
     */
    [AppMypage.ADD_CONTENTS]: (state, action) => {
      // spread payload because it is array
      return immutable.push(state, `mypage.boxContents`, ...action.payload)
    },

    /**
     * POSTS
     */
    [AppAdminPost.SET_LIST]: (state, action) => {
      // spread payload because it is array
      return immutable.set(state, `posts`, action.payload)
    },

    [AppAdminPost.PUSH_LIST]: (state, action) => {
      // spread payload because it is array
      return immutable.push(state, `posts`, ...action.payload)
    },

    /**
     * POST
     */
    [AppPost.SET_POST]: (state, action) => {
      return immutable.set(state, `post.data`, action.payload)
    }

    /**
     * ERRORS
     */
    // [AppErrors.PUSH]: (state, action) => {
    //   return immutable.set(state, `errors`, action.payload)
    // }
  },
  initialState
)
