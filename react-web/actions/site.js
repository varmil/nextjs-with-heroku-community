import { createAction } from 'redux-actions'
import { SitePreview, SiteTalkRoom, SitePost } from 'constants/ActionTypes'

// preview
export let setDevice = createAction(SitePreview.SET_DEVICE)

// common

// top

// welcome

// talk room
export let addTalkContents = createAction(SiteTalkRoom.ADD_CONTENTS)

// news

// post
export let setPost = createAction(SitePost.SET_POST)

/**
 *  ASYNC ACTIONS
 */
// export let loadData = createAction(Example.LOAD_DATA)
