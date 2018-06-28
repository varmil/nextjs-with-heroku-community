import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import immutable from 'object-path-immutable'
import {
  Logo as LogoDefault,
  // NotificationIcon as NotificationIconDefault,
  // AccountIcon as AccountIconDefault,
  MenuBar as MenuBarDefault,
  MainBanner as MainBannerDefault,
  Boxes as BoxesDefault,
  SubBanner as SubBannerDefault,
  Footer as FooterDefault,
  Welcome as WelcomeDefault,
  TalkRoomDescDefault,
  TalkRoomInputFormDefault,
  TalkRoomCategoriesDefault,
  NewsDescDefault,
  NewsCategoriesDefault
} from 'constants/SitePropsDefault'
import {
  SitePreview,
  SiteCommon,
  SiteTop,
  SiteWelcome,
  SiteTalkRoom,
  SiteNews
} from 'constants/ActionTypes'
import Device from 'constants/Device'

const initialState = {
  preview: {
    device: Device.MOBILE
  },

  common: {
    logo: LogoDefault,
    // notificationIcon: NotificationIconDefault,
    // accountIcon: AccountIconDefault,
    menuBar: MenuBarDefault,
    footer: FooterDefault
  },

  top: {
    mainBanner: MainBannerDefault,
    boxes: BoxesDefault,
    subBanner: SubBannerDefault
  },

  welcome: { ...WelcomeDefault },

  talkroom: {
    desc: TalkRoomDescDefault,
    inputForm: TalkRoomInputFormDefault,
    categories: TalkRoomCategoriesDefault
  },

  news: {
    desc: NewsDescDefault,
    categories: NewsCategoriesDefault
  }
}

// nested stateのエイリアス
export const PATH_MAP = {
  MAIN_BANNER: `top.mainBanner`,
  LOGO: `common.logo`,
  BOXES: `top.boxes`,
  TALK_CATEGORIES: `talkroom.categories`
}

export default handleActions(
  {
    /**
     * PREVIEW
     */
    [SitePreview.SET_DEVICE]: (state, action) => {
      return update(state, {
        preview: { $set: action.payload }
      })
    },

    /**
     * COMMON
     */
    [SiteCommon.SET_LOGO]: (state, action) => {
      return update(state, {
        common: { logo: { $set: action.payload } }
      })
    },
    // [SiteCommon.SET_NOTIFICATION_ICON]: (state, action) => {
    //   return update(state, {
    //     common: { notificationIcon: { $set: action.payload } }
    //   })
    // },
    // [SiteCommon.SET_ACCOUNT_ICON]: (state, action) => {
    //   return update(state, {
    //     common: { accountIcon: { $set: action.payload } }
    //   })
    // },
    [SiteCommon.SET_MENUBAR_STYLE]: (state, action) => {
      return update(state, setMenuBarStyle(action))
    },
    [SiteCommon.SET_MENUBAR_ITEM]: (state, action) => {
      return update(state, setMenuBarItem(action))
    },
    // [SiteCommon.SET_FOOTER]: (state, action) => {
    //   return update(state, {
    //     common: { footer: { $merge: action.payload } }
    //   })
    // },

    /**
     * TOP
     */
    [SiteTop.SET_MAIN_BANNER]: (state, action) => {
      // return update(state, {
      //   top: {
      //     mainBanner: {
      //       item: { [action.payload.index]: { $set: action.payload } }
      //     }
      //   }
      // })
      return immutable.set(
        state,
        `${PATH_MAP.MAIN_BANNER}.${action.payload.index}`,
        action.payload
      )
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
    },

    /**
     * WELCOME
     */
    [SiteWelcome.SET_WELCOME]: (state, action) => {
      return update(state, {
        welcome: {
          $set: action.payload
        }
      })
    }

    /**
     * TALK ROOM
     */
    // [SiteTalkRoom.SET_DESC]: (state, action) => {
    //   return update(state, {
    //     talkroom: { desc: { $set: action.payload } }
    //   })
    // },
    // [SiteTalkRoom.SET_INPUT_FORM]: (state, action) => {
    //   return update(state, {
    //     talkroom: { inputForm: { $set: action.payload } }
    //   })
    // },
    // [SiteTalkRoom.SET_CATEGORIES]: (state, action) => {
    //   return update(state, {
    //     talkroom: { categories: { $set: action.payload } }
    //   })
    // },

    /**
     * NEWS
     */
    // [SiteNews.SET_DESC]: (state, action) => {
    //   return update(state, {
    //     news: { desc: { $set: action.payload } }
    //   })
    // },
    // [SiteNews.SET_CATEGORIES]: (state, action) => {
    //   return update(state, {
    //     news: { categories: { $set: action.payload } }
    //   })
    // }
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
