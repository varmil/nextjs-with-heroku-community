import { createAction } from 'redux-actions'
import { SiteCommon, SiteTop } from 'constants/ActionTypes'

export let setLogo = createAction(SiteCommon.SET_LOGO, e => e)
export let setNotificationIcon = createAction(
  SiteCommon.SET_NOTIFICATION_ICON,
  e => e
)
export let setAccountIcon = createAction(SiteCommon.SET_ACCOUNT_ICON, e => e)

export let setMenuBarStyle = createAction(SiteCommon.SET_MENUBAR_STYLE, e => e)
export let setMenuBarItem = createAction(SiteCommon.SET_MENUBAR_ITEM, e => e)

export let setMainBanner = createAction(SiteTop.SET_MAIN_BANNER, e => e)
export let setSubBanner = createAction(SiteTop.SET_SUB_BANNER, e => e)

/**
 *  ASYNC ACTIONS
 */
// export let loadData = createAction(Example.LOAD_DATA)
