import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import app from './app'
import example from './example'
import site from './site'
import user from './user'
// import errors from './errors'
// import loading from './loading'

export const exampleInitialState = undefined

const rootReducer = combineReducers({
  // burgerMenu,
  toastr: toastrReducer,
  app,
  example,
  site,
  user
  // errors,
  // loading
})

export default rootReducer
