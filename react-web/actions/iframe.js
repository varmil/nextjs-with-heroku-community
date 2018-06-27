import { createAction } from 'redux-actions'
import { IFrame } from 'constants/ActionTypes'

/**
 *  ASYNC ACTIONS
 */
export let postMessage = createAction(IFrame.POST_MESSAGE)
