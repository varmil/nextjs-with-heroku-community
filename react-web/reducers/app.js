import { handleActions } from 'redux-actions'
import immutable from 'object-path-immutable'
import { AppTalkRoom, AppNews, AppPost } from 'constants/ActionTypes'

const initialState = {
  talkroom: {
    boxContents: [] // FETCH
  },

  news: {
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
     * NEWS
     */
    [AppNews.ADD_CONTENTS]: (state, action) => {
      // spread payload because it is array
      return immutable.push(state, `news.boxContents`, ...action.payload)
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
