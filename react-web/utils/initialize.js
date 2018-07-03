import Router from 'next/router'
import { reauthenticate } from 'actions/user'
import { getCookie } from 'utils/cookie'
import Rule from 'constants/Rule'

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function(ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      ctx.store.dispatch(
        reauthenticate(getCookie(Rule.COOKIE_JWT_TOKEN, ctx.req))
      )
    }
  } else {
    const token = ctx.store.getState().user.jwtToken

    if (
      token &&
      (ctx.pathname === '/view/signin' || ctx.pathname === '/view/signup')
    ) {
      setTimeout(function() {
        console.log('you are already logined')
        Router.push('/')
      }, 0)
    }
  }
}
