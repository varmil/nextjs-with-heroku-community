import { handleActions } from 'redux-actions'
import { SiteCommon, SiteTop } from 'constants/ActionTypes'

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
    [SiteCommon.SET_MENUBAR]: (state, action) => ({
      ...state,
      ...setMenuBar(action)
    })
  },
  initialState
)

function setMenuBar(action) {
  console.log('this is reducer', action)
  return {
    common: {
      menuBar: { style: action.payload.style }
    }
  }
}
