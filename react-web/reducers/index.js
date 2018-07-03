import { combineReducers } from 'redux'
import app from './app'
import example from './example'
import site from './site'
import user from './user'
// import errors from './errors'
// import loading from './loading'

export const exampleInitialState = undefined

const rootReducer = combineReducers({
  // burgerMenu,
  app,
  example,
  site,
  user
  // errors,
  // loading
})

export default rootReducer
