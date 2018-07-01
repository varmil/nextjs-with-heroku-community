import { createAction } from 'redux-actions'
import { AppTalkRoom, AppVoice, AppNews, AppPost } from 'constants/ActionTypes'

// talk room
export let addTalkContents = createAction(AppTalkRoom.ADD_CONTENTS)

// voice
export let addVoiceContents = createAction(AppVoice.ADD_CONTENTS)

// news
export let addNewsContents = createAction(AppNews.ADD_CONTENTS)

// post
export let setPost = createAction(AppPost.SET_POST)
