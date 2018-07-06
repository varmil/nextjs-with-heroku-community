import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import app from './app'
import example from './example'
import site from './site'
import user from './user'

export const exampleInitialState = undefined

const rootReducer = combineReducers({
  toastr: toastrReducer,
  app,
  example,
  site,
  user
})

export default rootReducer
