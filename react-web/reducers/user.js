import { handleActions } from 'redux-actions'
import immutable from 'object-path-immutable'
import { User } from 'constants/ActionTypes'

const initialState = {
  id: undefined,
  jwtToken: null,
  nickname: '',
  iconPath: ''
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

    // set basic information
    [User.SET]: (state, action) => {
      return { ...state, ...action.payload }
    }
  },
  initialState
)
