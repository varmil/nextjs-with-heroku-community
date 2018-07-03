import { handleActions } from 'redux-actions'
import immutable from 'object-path-immutable'
import { User } from 'constants/ActionTypes'

const initialState = {
  id: undefined,
  nickname: '',
  jwtToken: null
}

export default handleActions(
  {
    /**
     * AUTH
     */
    [User.AUTHENTICATE]: (state, action) => {
      return immutable.set(state, `jwtToken`, action.payload)
    },
    [User.DEAUTHENTICATE]: (state, action) => {
      return immutable.set(state, `jwtToken`, null)
    },

    [User.SET]: (state, action) => {
      return { ...state, ...action.payload }
    }
  },
  initialState
)