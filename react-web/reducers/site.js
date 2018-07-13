import { handleActions } from 'redux-actions'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'
import isEmpty from 'lodash/isEmpty'
import update from 'immutability-helper'
import immutable from 'object-path-immutable'
import {
  Logo as LogoDefault,
  NavIconColorDefault,
  ColorDefault,
  MainBanner as MainBannerDefault,
  Boxes as BoxesDefault,
  SubBanner as SubBannerDefault,
  Welcome as WelcomeDefault,
  TalkRoomCategoriesDefault,
  NewsCategoriesDefault
} from 'constants/SitePropsDefault'
import {
  SiteState,
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
    navIcon: NavIconColorDefault,
    // 汎用で使う背景色（テーマ色みたいな）
    color: ColorDefault
  },

  top: {
    mainBanner: MainBannerDefault,
    boxes: BoxesDefault
  },

  welcome: { ...WelcomeDefault },

  talk: {
    categories: TalkRoomCategoriesDefault,
    subBanner: SubBannerDefault
  },

  news: {
    categories: NewsCategoriesDefault,
    subBanner: SubBannerDefault
  }
}

// nested stateのエイリアス
export const PATH_MAP = {
  WELCOME: 'welcome',
  COLOR: 'common.color',
  MAIN_BANNER: `top.mainBanner`,
  LOGO: `common.logo`,
  NAV_ICON: `common.navIcon`,
  BOXES: `top.boxes`,
  TALK_CATEGORIES: `talk.categories`,
  NEWS_CATEGORIES: `news.categories`,
  TALK_SUB_BANNER: `talk.subBanner`,
  NEWS_SUB_BANNER: `news.subBanner`
}

export default handleActions(
  {
    /**
     * まるっとSET (payloadがそのままnew-state)
     */
    [SiteState.SET]: (state, action) => {
      // console.log('まるっとセット', action.payload)
      // do nothing if payload is empty
      if (isEmpty(action.payload)) return state
      return action.payload
    },

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
    [SiteCommon.SET_NAV_ICON_COLOR]: (state, action) => {
      const filtered = pickBy(action.payload, identity)
      return immutable.merge(state, `${PATH_MAP.NAV_ICON}`, filtered)
    },
    [SiteCommon.SET_BG_COLOR]: (state, action) => {
      // remove falsy key (ex) index: undefined
      const filtered = pickBy(action.payload, identity)
      return immutable.merge(state, `${PATH_MAP.COLOR}`, filtered)
    },

    /**
     * TOP
     */
    [SiteTop.SET_MAIN_BANNER]: (state, action) => {
      return immutable.set(
        state,
        `${PATH_MAP.MAIN_BANNER}.${action.payload.index}`,
        action.payload
      )
    },
    [SiteTop.SET_BOXES]: (state, action) => {
      return immutable.set(state, `${PATH_MAP.BOXES}`, action.payload)
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
    },

    /**
     * TALK ROOM
     */
    [SiteTalkRoom.SET_CATEGORIES]: (state, action) => {
      return update(state, {
        talk: { categories: { $set: action.payload } }
      })
    },
    [SiteTalkRoom.SET_SUB_BANNER]: (state, action) => {
      return immutable.set(
        state,
        `${PATH_MAP.TALK_SUB_BANNER}.${action.payload.index}`,
        action.payload
      )
    },

    /**
     * NEWS
     */
    [SiteNews.SET_CATEGORIES]: (state, action) => {
      return update(state, {
        news: { categories: { $set: action.payload } }
      })
    }
  },
  initialState
)
