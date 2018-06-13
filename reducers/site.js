import { handleActions } from 'redux-actions'
import { SiteCommon, SiteTop } from 'constants/ActionTypes'
import update from 'immutability-helper'

const initialState = {
  common: {
    menuBar: { style: {} }
  },
  top: {}
}

export default handleActions(
  {
    [SiteCommon.SET_LOGO]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [SiteCommon.SET_MENUBAR]: (state, action) => {
      return update(state, setMenuBar(action))
    }
  },
  initialState
)

function setMenuBar(action) {
  return {
    common: {
      menuBar: { style: { $set: action.payload.style } }
    }
  }
}
