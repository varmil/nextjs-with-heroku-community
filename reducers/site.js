import { handleActions } from 'redux-actions'
import {
  Logo as LogoDefault,
  NotificationIcon as NotificationIconDefault,
  AccountIcon as AccountIconDefault,
  MenuBar as MenuBarDefault,
  MainBanner as MainBannerDefault,
  Boxes as BoxesDefault,
  SubBanner as SubBannerDefault
} from 'constants/SitePropsDefault'
import { SiteCommon, SiteTop } from 'constants/ActionTypes'
import update from 'immutability-helper'

const initialState = {
  common: {
    logo: LogoDefault,
    notificationIcon: NotificationIconDefault,
    accountIcon: AccountIconDefault,
    menuBar: MenuBarDefault
  },
  top: {
    mainBanner: MainBannerDefault,
    boxes: BoxesDefault,
    subBanner: SubBannerDefault
  }
}

export default handleActions(
  {
    /**
     * COMMON
     */
    [SiteCommon.SET_LOGO]: (state, action) => {
      return update(state, {
        common: { logo: { $set: action.payload } }
      })
    },
    [SiteCommon.SET_NOTIFICATION_ICON]: (state, action) => {
      return update(state, {
        common: { notificationIcon: { $set: action.payload } }
      })
    },
    [SiteCommon.SET_ACCOUNT_ICON]: (state, action) => {
      return update(state, {
        common: { accountIcon: { $set: action.payload } }
      })
    },
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
    },
    [SiteTop.SET_BOX_HEADER]: (state, action) => {
      return update(state, {
        top: {
          boxes: {
            [action.payload.index]: { header: { $merge: action.payload } }
          }
        }
      })
    },
    [SiteTop.SET_SUB_BANNER]: (state, action) => {
      return update(state, {
        top: {
          subBanner: {
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
