import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import app from './app'
import site from './site'
import user from './user'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  app,
  site,
  user
})

export default rootReducer
