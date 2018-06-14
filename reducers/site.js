import { handleActions } from 'redux-actions'
import {
  MenuBar as MenuBarDefault,
  MainBanner as MainBannerDefault,
  SubBanner as SubBannerDefault
} from 'constants/SitePropsDefault'
import { SiteCommon, SiteTop } from 'constants/ActionTypes'
import update from 'immutability-helper'

const initialState = {
  common: {
    menuBar: MenuBarDefault
  },
  top: {
    mainBanner: MainBannerDefault,
    subBanner: SubBannerDefault
  }
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
    },
    /**
     * TOP
     */
    [SiteTop.SET_MAIN_BANNER]: (state, action) => {
      return update(state, {
        top: {
          mainBanner: {
            item: { [action.payload.index]: { $set: action.payload } }
          }
        }
      })
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
