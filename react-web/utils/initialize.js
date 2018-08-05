// import Router from 'next/router'
import { reauthenticate } from 'actions/user'
import { createAction } from 'redux-actions'
import { User, SiteState } from 'constants/ActionTypes'
import { getCookie } from 'utils/cookie'
import { Router } from 'routes'
import Rule from 'constants/Rule'
import url from 'constants/URL'

const ONLY_GUEST_ROUTES = [
  '/view/signin',
  '/view/signup',
  'admin/site/edit/welcome/signup'
]

function dispatchUserInit(ctx, token) {
  // store token
  ctx.store.dispatch(reauthenticate(token))
  // fetch and set user basic info from API server with token
  ctx.store.dispatch(createAction(User.FETCH_REQUEST)())
  // HACK: low performance, fetch design of the brand
  ctx.store.dispatch(createAction(SiteState.FETCH_REQUEST)())
  // update
  ctx.store.dispatch(createAction(User.UPDATE_LOGINED_AT_REQUEST)())
}

function redirectIfNeeded(ctx, token) {
  // 現在ログイン状態でこれらのページにアクセスしたらリダイレクト
  function redirectToHomeIfNeeded(ctx) {
    const shouldRedirect = ONLY_GUEST_ROUTES.some(r => ctx.pathname.includes(r))
    console.info('TO HOME', ctx.pathname, shouldRedirect)
    if (shouldRedirect) {
      console.log('you are already logined')
      Router.replaceRoute(url.VIEW_HOME)
    }
  }

  // 現在未ログイン状態なら、signin, signup関連のページのみ表示許可
  function redirectToSigninIfNeeded(ctx) {
    const isSafePath = ONLY_GUEST_ROUTES.some(r => ctx.pathname.includes(r))
    console.info('TO SIGNIN', ctx.pathname, isSafePath)
    if (!isSafePath) {
      return Router.pushRoute('/view/signin')
    }
  }

  // tokenが正しいかはわからないが、tokenありなしでリダイレクト挙動を分ける
  if (token) {
    redirectToHomeIfNeeded(ctx)
  } else {
    redirectToSigninIfNeeded(ctx)
  }
}

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function(ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const token = getCookie(Rule.COOKIE_JWT_TOKEN, ctx.req)
      if (token) {
        dispatchUserInit(ctx, token)
      }
    }
  } else {
    const token = ctx.store.getState().user.jwtToken
    redirectIfNeeded(ctx, token)
  }
}
