import { createAction } from 'redux-actions'
import { Router } from 'routes'
import { User } from 'constants/ActionTypes'
import { removeCookie } from 'utils/cookie'

// gets the token from the cookie and saves it in the store
export let reauthenticate = createAction(User.AUTHENTICATE)
// removing the token
export let deauthenticate = createAction(User.DEAUTHENTICATE, e => {
  removeCookie('token')
  Router.push('/')
  return e
})
