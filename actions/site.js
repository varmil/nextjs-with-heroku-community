import { createAction } from 'redux-actions'
import { SiteCommon, SiteTop } from 'constants/ActionTypes'

export let setLogo = createAction(SiteCommon.SET_LOGO, e => e)
export let setMenuBar = createAction(SiteCommon.SET_MENUBAR, e => e)

/**
 *  ASYNC ACTIONS
 */
// export let loadData = createAction(Example.LOAD_DATA)
