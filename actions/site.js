import { createAction } from 'redux-actions'
import {
  SitePreview,
  SiteCommon,
  SiteTop,
  SiteWelcome,
  SiteTalkRoom,
  SiteNews
} from 'constants/ActionTypes'

// preview
export let setDevice = createAction(SitePreview.SET_DEVICE, e => e)

// common
export let setLogo = createAction(SiteCommon.SET_LOGO, e => e)
export let setNotificationIcon = createAction(
  SiteCommon.SET_NOTIFICATION_ICON,
  e => e
)
export let setAccountIcon = createAction(SiteCommon.SET_ACCOUNT_ICON, e => e)
export let setMenuBarStyle = createAction(SiteCommon.SET_MENUBAR_STYLE, e => e)
export let setMenuBarItem = createAction(SiteCommon.SET_MENUBAR_ITEM, e => e)
export let setFooter = createAction(SiteCommon.SET_FOOTER, e => e)

// top
export let setMainBanner = createAction(SiteTop.SET_MAIN_BANNER, e => e)
export let setBoxHeader = createAction(SiteTop.SET_BOX_HEADER, e => e)
export let setSubBanner = createAction(SiteTop.SET_SUB_BANNER, e => e)

// welcome
export let setWelcome = createAction(SiteWelcome.SET_WELCOME, e => e)

// talk room
export let setTalkRoomDesc = createAction(SiteTalkRoom.SET_DESC, e => e)
export let setTalkRoomInputForm = createAction(
  SiteTalkRoom.SET_INPUT_FORM,
  e => e
)
export let setTalkRoomCategories = createAction(
  SiteTalkRoom.SET_CATEGORIES,
  e => e
)

// talk room
export let setNewsDesc = createAction(SiteNews.SET_DESC, e => e)
export let setNewsCategories = createAction(SiteNews.SET_CATEGORIES, e => e)

/**
 *  ASYNC ACTIONS
 */
// export let loadData = createAction(Example.LOAD_DATA)
