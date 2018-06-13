import { handleActions } from 'redux-actions'
import { SiteCommon, SiteTop } from 'constants/ActionTypes'
import update from 'immutability-helper'

const initialState = {
  common: {
    menuBar: { style: {}, item: [] }
  },
  top: {}
}

export default handleActions(
  {
    /**
     * COMMON
     */
    [SiteCommon.SET_LOGO]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [SiteCommon.SET_MENUBAR_STYLE]: (state, action) => {
      return update(state, setMenuBarStyle(action))
    },
    [SiteCommon.SET_MENUBAR_ITEM]: (state, action) => {
      return update(state, setMenuBarItem(action))
    }
  },
  initialState
)

function setMenuBarStyle(action) {
  return {
    common: {
      menuBar: { style: { $set: action.payload } }
    }
  }
}

function setMenuBarItem(action) {
  return {
    common: {
      menuBar: { item: { $set: action.payload } }
    }
  }
}
