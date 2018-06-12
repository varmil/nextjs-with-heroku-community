import { handleActions } from 'redux-actions'
import { Example } from 'constants/ActionTypes'

const initialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

export default handleActions(
  {
    [Example.FAILURE]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [Example.LOAD_DATA_SUCCESS]: (state, action) => ({
      ...state,
      placeholderData: action.payload
    })
  },
  initialState
)
