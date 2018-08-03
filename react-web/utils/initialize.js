// import Router from 'next/router'
import { reauthenticate } from 'actions/user'
import { createAction } from 'redux-actions'
import { User, SiteState } from 'constants/ActionTypes'
import { getCookie } from 'utils/cookie'
import Rule from 'constants/Rule'

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function(ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const token = getCookie(Rule.COOKIE_JWT_TOKEN, ctx.req)
      if (token) {
        // store token
        ctx.store.dispatch(reauthenticate(token))
        // fetch and set user basic info from API server with token
        ctx.store.dispatch(createAction(User.FETCH_REQUEST)())
        // HACK: low performance, fetch design of the brand
        ctx.store.dispatch(createAction(SiteState.FETCH_REQUEST)())
        // update
        ctx.store.dispatch(createAction(User.UPDATE_LOGINED_AT_REQUEST)())
      }
    }
  } else {
    const token = ctx.store.getState().user.jwtToken
    if (token && ctx.pathname === '/view/signin') {
      console.log('you are already logined')
      // Router.push('/')
    }
  }
}
