import { createAction } from 'redux-actions'
import { AppTalkRoom, AppNews, AppPost } from 'constants/ActionTypes'

// talk room
export let addTalkContents = createAction(AppTalkRoom.ADD_CONTENTS)

// news
export let addNewsContents = createAction(AppNews.ADD_CONTENTS)

// post
export let setPost = createAction(AppPost.SET_POST)

/**
 *  ASYNC ACTIONS
 */
// export let loadData = createAction(Example.LOAD_DATA)
