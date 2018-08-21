// import Router from 'next/router'
import { reauthenticate } from 'actions/user'
import { createAction } from 'redux-actions'
import { User, SiteState } from 'constants/ActionTypes'
import { getCookie } from 'utils/cookie'
import Router from 'next/router'
import Rule from 'constants/Rule'
import url from 'constants/URL'

// 部分一致。これらがpathnameの一部に含まれていれば誰でもアクセス可能
const PUBLIC_ROUTES = [
  '/view/settings/privacy_policy',
  '/view/settings/membership_agreement'
]

// 部分一致。これらがpathnameの一部に含まれていればGUESTのみアクセス可能
const ONLY_GUEST_ROUTES = [
  '/view/signin',
  '/view/signup/email',
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
  const redirect = (res, to) => {
    if (res) {
      ctx.res.writeHead(302, { Location: to })
      ctx.res.end()
    } else {
      Router.push(to)
    }
  }

  // 現在ログイン状態でONLY_GUEST_ROUTESにアクセスしたらリダイレクト
  const redirectToHomeIfNeeded = ctx => {
    const shouldRedirect = ONLY_GUEST_ROUTES.some(r => ctx.pathname.includes(r))
    // console.log('TO HOME', ctx.pathname, shouldRedirect)
    if (shouldRedirect) {
      redirect(ctx.res, url.VIEW_HOME)
      return true
    }
    return false
  }

  // 現在未ログイン状態なら、PUBLIC_ROUTES, ONLY_GUEST_ROUTESのみ表示許可
  const redirectToSigninIfNeeded = ctx => {
    // PUBLIC_ROUTES
    {
      const isSafePath = PUBLIC_ROUTES.some(r => ctx.pathname.includes(r))
      if (isSafePath) return false
    }

    // ONLY_GUEST_ROUTES
    {
      const isSafePath = ONLY_GUEST_ROUTES.some(r => ctx.pathname.includes(r))
      // console.log('TO SIGNIN', ctx.pathname, isSafePath)
      if (!isSafePath) {
        redirect(ctx.res, '/view/signin')
        return true
      }
    }
    return false
  }

  // tokenが正しいかはわからないが、tokenありなしでリダイレクト挙動を分ける
  if (token) {
    redirectToHomeIfNeeded(ctx)
  } else {
    redirectToSigninIfNeeded(ctx)
  }
}

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default ctx => {
  if (ctx.isServer) {
    const token = getCookie(Rule.COOKIE_JWT_TOKEN, ctx.req)

    const isRedirected = redirectIfNeeded(ctx, token)
    if (isRedirected) return

    if (token) {
      dispatchUserInit(ctx, token)
    }
  } else {
    const token = ctx.store.getState().user.jwtToken
    redirectIfNeeded(ctx, token)
  }
}
