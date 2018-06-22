import { createAction } from 'redux-actions'
import { Example } from 'constants/ActionTypes'

export let failure = createAction(Example.FAILURE, error => error)

export let loadDataSuccess = createAction(
  Example.LOAD_DATA_SUCCESS,
  data => data
)

/**
 *  ASYNC ACTIONS
 */
export let loadData = createAction(Example.LOAD_DATA)
