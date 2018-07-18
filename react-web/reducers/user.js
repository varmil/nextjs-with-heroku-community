import { handleActions } from 'redux-actions'
import immutable from 'object-path-immutable'
import { User } from 'constants/ActionTypes'

const initialState = {
  id: undefined,
  jwtToken: null,
  nickname: '',
  iconPath: '/static/img/icon/usericon_default.png',
  // (Admin, User) 今自分が見ているブランド
  brand: { id: undefined, name: '' }

  // NOTE: これらは分ける必要ないかも？
  // (Admin) 所有するブランド一覧
  // ownedBrands: [],
  // (User) 所属するブランド一覧
  // joinedBrands: []
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
