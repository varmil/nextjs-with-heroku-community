import { combineReducers } from 'redux'
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
