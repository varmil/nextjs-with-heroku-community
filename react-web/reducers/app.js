import { handleActions } from 'redux-actions'
import immutable from 'object-path-immutable'
import {
  AppBox,
  AppTalkRoom,
  AppVoice,
  AppNews,
  AppMypage,
  AppPost,
  AppAdminPost
} from 'constants/ActionTypes'

const initialState = {
  talk: {
    boxContents: [] // use in /view/home
  },

  voice: {
    boxContents: []
  },

  news: {
    boxContents: []
  },

  mypage: {
    boxContents: []
  },

  // Admin用。投稿一覧画面
  posts: [],

  // Admin, User兼用。記事詳細画面
  post: {
    data: {},
    comments: []
  }
}

export default handleActions(
  {
    /**
     * APP BOX : dynamicにboxContentsに操作を加える
     */
    [AppBox.PREPEND_CONTENT]: (state, action) => {
      const { path, data } = action.payload
      return immutable.insert(state, path, data, 0)
    },

    /**
     * TALK ROOM
     */
    [AppTalkRoom.ADD_CONTENTS]: (state, action) => {
      // spread payload because it is array
      return immutable.push(state, `talk.boxContents`, ...action.payload)
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
    [AppAdminPost.SET]: (state, action) => {
      return immutable.set(state, `post.data`, action.payload)
    },
    [AppPost.SET_POST]: (state, action) => {
      return immutable.set(state, `post.data`, action.payload)
    },
    [AppPost.PREPEND_COMMENT]: (state, action) => {
      return immutable.insert(state, `post.comments`, action.payload, 0)
    },
    [AppPost.SET_COMMENTS]: (state, action) => {
      return immutable.set(state, `post.comments`, action.payload)
    },
    [AppPost.PUSH_COMMENTS]: (state, action) => {
      // spread payload because it is array
      return immutable.push(state, `post.comments`, ...action.payload)
    }
  },
  initialState
)
