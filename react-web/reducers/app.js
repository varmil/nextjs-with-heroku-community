import { handleActions } from 'redux-actions'
import immutable from 'object-path-immutable'
import {
  AppTalkRoom,
  AppVoice,
  AppNews,
  AppMypage,
  AppPost
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
     * POST
     */
    [AppPost.SET_POST]: (state, action) => {
      return immutable.set(state, `post.data`, action.payload)
    }
  },
  initialState
)
