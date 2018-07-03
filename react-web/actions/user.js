import { createAction } from 'redux-actions'
import { Router } from 'routes'
import { User } from 'constants/ActionTypes'
import Rule from 'constants/Rule'
import { removeCookie } from 'utils/cookie'

// gets the token from the cookie and saves it in the store
export let reauthenticate = createAction(User.AUTHENTICATE)
// removing the token
export let deauthenticate = createAction(User.DEAUTHENTICATE, e => {
  removeCookie(Rule.COOKIE_JWT_TOKEN)
  Router.push('/')
  return e
})
