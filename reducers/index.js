import { combineReducers } from 'redux'
import { reducer as burgerMenu } from 'redux-burger-menu'
import example from './example'
import site from './site'
// import area from './area'
// import searchForm from './searchForm'
// import restaurants from './restaurants'
// import restaurantDetail from './restaurantDetail'
// import errors from './errors'
// import loading from './loading'

export const exampleInitialState = undefined

const rootReducer = combineReducers({
  burgerMenu,
  example,
  site
  // area,
  // searchForm,
  // restaurants,
  // restaurantDetail,
  // errors,
  // loading
})

export default rootReducer
