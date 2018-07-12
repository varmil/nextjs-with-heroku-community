import { handleActions } from 'redux-actions'
import immutable from 'object-path-immutable'
import objectPath from 'object-path'
import findIndex from 'lodash/findIndex'
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
  posts: { count: 0, item: [] },

  // Admin, User兼用。記事詳細画面
  post: {
    data: {},
    comments: []
  }
}

// すべてのboxContentsを走査して、データ更新
function findAllAndUpdate(state, postId, path, updater) {
  let newState = state

  const talk = objectPath.get(state, `talk.boxContents`)
  const voice = objectPath.get(state, `voice.boxContents`)
  const news = objectPath.get(state, `news.boxContents`)
  const mypage = objectPath.get(state, `mypage.boxContents`)
  const post = objectPath.get(state, `post.data`)

  if (talk) {
    const i = findIndex(talk, c => c.id === +postId)
    if (i !== -1) {
      newState = immutable.update(
        newState,
        `talk.boxContents.${i}.${path}`,
        updater
      )
    }
  }
  if (voice) {
    const i = findIndex(voice, c => c.id === +postId)
    if (i !== -1) {
      newState = immutable.update(
        newState,
        `voice.boxContents.${i}.${path}`,
        updater
      )
    }
  }
  if (news) {
    const i = findIndex(news, c => c.id === +postId)
    if (i !== -1) {
      newState = immutable.update(
        newState,
        `news.boxContents.${i}.${path}`,
        updater
      )
    }
  }
  if (mypage) {
    const i = findIndex(mypage, c => c.id === +postId)
    if (i !== -1) {
      newState = immutable.update(
        newState,
        `mypage.boxContents.${i}.${path}`,
        updater
      )
    }
  }

  // 記事詳細は配列ではない
  if (post) {
    if (post.id === +postId) {
      newState = immutable.update(newState, `post.data.${path}`, updater)
    }
  }

  return newState
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
     *  POSTS
     *  SET   : payload is { count, item }
     *  PUSH  : payload is []
     */
    [AppAdminPost.SET_LIST]: (state, action) => {
      return immutable.set(state, `posts`, action.payload)
    },

    [AppAdminPost.PUSH_LIST]: (state, action) => {
      // spread payload because it is array
      let newState = immutable.push(state, `posts.item`, ...action.payload)
      newState = immutable.update(
        state,
        `posts.count`,
        c => c + action.payload.length
      )
      return newState
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
    },

    /**
     * POST VOTE
     */
    [AppPost.INCREMENT_VOTE_SUM]: (state, action) => {
      return findAllAndUpdate(
        state,
        +action.payload.postId,
        `Voice.count`,
        c => c + 1
      )
    },

    /**
     * POST LIKE
     */
    [AppPost.INCREMENT_LIKE_SUM]: (state, action) => {
      const { postId, upOrDown } = action.payload
      let newState
      // LIKE総数を増加
      newState = findAllAndUpdate(
        state,
        +postId,
        `like`,
        c => (upOrDown ? c + 1 : c - 1)
      )
      // 自分がLIKEしてるかを更新。1POSTにLikeは1つなのでindexは0。また、とりあえず常にTRUE
      newState = findAllAndUpdate(
        newState,
        +postId,
        `PostLikes.0.upOrDown`,
        c => upOrDown
      )
      return newState
    },

    /**
     * POST COMMENT
     */
    [AppPost.INCREMENT_COMMENT_SUM]: (state, action) => {
      const { postId } = action.payload
      let newState
      // LIKE総数を増加
      newState = findAllAndUpdate(state, +postId, `comment`, c => c + 1)
      return newState
    }
  },
  initialState
)
