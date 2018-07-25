// import { delay } from 'redux-saga'
import {
  all,
  fork,
  call,
  put,
  select,
  takeLatest,
  takeEvery
} from 'redux-saga/effects'
import isUndefined from 'lodash/isUndefined'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import isNaN from 'lodash/isNaN'
import qs from 'query-string'
import {
  User,
  SiteState,
  IFrame,
  AppBox,
  AppTalkRoom,
  AppVoice,
  AppNews,
  AppMypage,
  AppPost,
  AppAdminPost,
  AppAdminFan
} from 'constants/ActionTypes'
import {
  addTalkContents,
  addVoiceContents,
  addNewsContents,
  addMypageContents,
  // setPost,
  setCommonError
} from 'actions/application'
import BoxType from '/../shared/constants/BoxType'
import { createAction } from 'redux-actions'
import { setCookie } from 'utils/cookie'
import API from 'utils/API'
import * as utilFiles from 'utils/files'
import Rule from 'constants/Rule'

// select User !
const getUser = state => state.user

// Admin,User共通のsignin
function* signin({ payload }) {
  const { email, password, successCb, errorMessage } = payload
  try {
    const res = yield call(API.post, '/signin', { email, password })
    yield call(setUserInfo, res.data.token)
    yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(errorMessage || e.response))
  }
}

// 通常ユーザのsignup
function* signupUser({ payload }) {
  const { email, password, successCb } = payload
  try {
    const res = yield call(API.post, '/signup', { email, password })
    yield call(setUserInfo, res.data.token)
    yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// Adminのsignup
function* signupAdmin({ payload }) {
  const {
    successCb,
    email,
    password,
    brandName,
    lastName,
    firstName,
    files
  } = payload

  let formData = new FormData()
  formData.append('isAdmin', true)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('brandName', brandName)
  formData.append('lastName', lastName)
  formData.append('firstName', firstName)
  utilFiles.append(formData, files)

  try {
    const res = yield call(API.post, '/signup/admin', formData)
    yield call(setUserInfo, res.data.token)
    yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// tokenをもとにして基本情報をset（AUTH後に基本呼ぶ）
function* setUserInfo(token) {
  setCookie(Rule.COOKIE_JWT_TOKEN, token)
  yield put(createAction(User.AUTHENTICATE)(token))
  yield put(createAction(User.FETCH_REQUEST)(token))
}

// （初期登録、プロフィール編集？）
function* saveUserProfile({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { nickname, files, successCb } = payload
  let formData = new FormData()
  formData.append('nickname', nickname)
  utilFiles.append(formData, files)

  try {
    const res = yield call(API.post, '/user/profile', formData, jwtToken)
    // 冗長だが、再度最新のUser情報をfetch
    yield put(createAction(User.FETCH_REQUEST)(jwtToken))
    yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// payload is token
function* fetchUser({ payload }) {
  try {
    const res = yield call(API.fetch, '/user', payload)
    yield put(createAction(User.SET)({ ...res.data }))
  } catch (e) {
    console.warn('failed fetch user info', e.response.statusText)
  }
}

// 必要ならサーバ側で最終ログイン日時を更新
function* updateLoginedAt({ payload }) {
  const { jwtToken } = yield select(getUser)
  try {
    yield call(API.post, '/loginedat', {}, jwtToken)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* fetchCodeInfo({ payload }) {
  const { code } = payload
  try {
    const { data } = yield call(API.fetch, `/auth/code/${code}`)
    // 招待コードもStoreに保存しておいてsignup時に一緒にPOSTする
    yield put(createAction(User.SET)({ email: data, invitationCode: code }))
  } catch (e) {
    console.warn('failed fetch user info', e.response.statusText)
  }
}

/**
 * SITE
 */

function* saveSiteState({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { action } = payload

  // まずstate.siteを更新させる。更新後のstate.siteをサーバへ送信
  yield put(action)
  const siteState = yield select(state => state.site)

  try {
    yield call(API.post, '/site/design', { siteState }, jwtToken)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* fetchSiteState({ payload }) {
  // fetch brand design (category, subBanner, etc.) then put them into store
  const { jwtToken } = yield select(getUser)
  try {
    const res = yield call(API.fetch, '/site/design', jwtToken)
    yield put(createAction(SiteState.SET)({ ...res.data.design }))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

/**
 * BOX CONTENTS
 */

// perPage  : the amount of contents with each fetching
// released : fetch released posts only if true
function fetchContents(boxType, setAction) {
  return function*({ payload }) {
    const { jwtToken } = yield select(getUser)
    const { perPage, pageNum, released, successCb } = payload

    // 現在のURLについているqsをパース
    let parsed = {}
    parsed = qs.parse(location.search)
    console.log('parsed', parsed, window.location.pathname)

    // APIサーバに投げるqsを生成
    const query = qs.stringify({
      released,
      perPage,
      categoryIndex: parsed.categoryIndex
    })

    const res = yield call(
      API.fetch,
      `/post/list/box/${boxType}/${pageNum || 1}?${query}`,
      jwtToken
    )

    yield put(setAction(res.data))
    if (successCb) yield call(successCb, res)
  }
}

function* fetchTalkContents({ payload }) {
  const func = fetchContents(BoxType.index.talk, addTalkContents)
  yield call(func, { payload })
}

function* fetchVoiceContents({ payload }) {
  const func = fetchContents(BoxType.index.voice, addVoiceContents)
  yield call(func, { payload })
}

function* fetchNewsContents({ payload }) {
  const func = fetchContents(BoxType.index.news, addNewsContents)
  yield call(func, { payload })
}

function* fetchMypageContents({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { perPage, pageNum, successCb } = payload

  try {
    const query = qs.stringify({ perPage })
    const res = yield call(
      API.fetch,
      `/post/list/me/${pageNum || 1}?${query}`,
      jwtToken
    )
    yield put(addMypageContents(res.data))
    if (successCb) yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

/**
 * POST
 */

// (Admin用)一覧
function* fetchPosts({ payload }) {
  const { pageNum, perPage } = payload
  const { jwtToken } = yield select(getUser)

  try {
    const query = qs.stringify({ perPage })
    const { data } = yield call(
      API.fetch,
      `/post/list/${pageNum}?${query}`,
      jwtToken
    )
    const action = createAction(AppAdminPost.SET_LIST)
    yield put(action(data))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// 個別記事詳細ページ
function* fetchPost({ payload }) {
  const { postId, successCb } = payload
  const { jwtToken } = yield select(getUser)
  try {
    const { data } = yield call(API.fetch, `/post/${postId}`, jwtToken)
    const action = createAction(AppAdminPost.SET)
    yield put(action({ ...data }))

    // fetch-set comments
    // yield call(fetchComments, { payload: { postId, reset: true } })
    if (successCb) yield call(successCb, data)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* fetchComments({ payload }) {
  const {
    postId,
    pageNum,
    perPage,
    initialOffset,
    // --- option ---
    successCb,
    index,
    reset
  } = payload
  const { jwtToken } = yield select(getUser)
  try {
    const query = qs.stringify({ perPage, initialOffset, index })
    const { data } = yield call(
      API.fetch,
      `/comments/${postId}/${pageNum || 1}?${query}`,
      jwtToken
    )

    // reset が有効 OR ページ番号が１なら配列初期化してset
    const type =
      reset || +pageNum === 1 ? AppPost.SET_COMMENTS : AppPost.PUSH_COMMENTS
    // index指定するとcommentsを[[]]とみなして、指定indexにSET, PUSHする
    yield put(createAction(type)({ data, index }))
    if (successCb) yield call(successCb, data)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* savePost({ payload }) {
  const {
    successCb,
    errCb,
    // 必須
    boxType,
    title,
    body,
    released,
    // 任意
    postId,
    files,
    categoryIndex,
    // VOICE
    options,
    deadline
  } = payload
  const { jwtToken } = yield select(getUser)

  // 複数画像をPOSTするためにFormDataを使用する
  let formData = new FormData()
  formData.append('boxType', boxType)
  formData.append('title', title)
  formData.append('body', body)
  formData.append('released', isBoolean(released) ? released : true)
  utilFiles.append(formData, files)
  if (!isNaN(+postId) && isNumber(+postId) && +postId !== 0) {
    formData.append('postId', +postId)
  }
  if (!isNaN(+categoryIndex) && isNumber(+categoryIndex)) {
    formData.append('categoryIndex', +categoryIndex)
  }
  Array.isArray(options) &&
    options.forEach(option => {
      formData.append('options[]', option)
    })
  if (!isUndefined(deadline)) {
    formData.append('deadline', deadline)
  }

  try {
    const res = yield call(API.post, '/post', formData, jwtToken)
    // HACK: 今の自分の投稿をfetchしてPREPEND
    const { data } = yield call(API.fetch, `/post/${res.data.id}`, jwtToken)
    const path = `${BoxType.slug[boxType]}.boxContents`
    yield put(createAction(AppBox.PREPEND_CONTENT)({ path, data }))
    yield call(successCb, res)
  } catch (e) {
    if (errCb) yield call(errCb, e.response)
    yield put(setCommonError(e.response))
  }
}

function* saveComment({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { postId, body, successCb } = payload
  try {
    const res = yield call(API.post, '/comment', { postId, body }, jwtToken)
    // 今の投稿をPREPEND（postと違ってコメントデータそのものが返却される）
    yield put(createAction(AppPost.PREPEND_COMMENT)(res.data))
    // storeに保存されてる当該データ（複数ありうる）のcommentを更新
    yield put(createAction(AppPost.INCREMENT_COMMENT_SUM)({ postId }))

    yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* saveLike({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { postId, upOrDown, successCb } = payload
  try {
    const res = yield call(
      API.post,
      '/post/like',
      { postId, upOrDown },
      jwtToken
    )
    // storeに保存されてる当該データ（複数ありうる）のlikeを更新
    yield put(createAction(AppPost.INCREMENT_LIKE_SUM)({ postId, upOrDown }))
    if (successCb) yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* saveVote({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { postId, choiceIndex, comment, successCb } = payload
  try {
    const res = yield call(
      API.post,
      '/post/vote',
      { postId, choiceIndex, comment },
      jwtToken
    )
    yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

/**
 * Fans
 */

// (Admin用)招待コード発行
function* saveInvitation({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { emails, roleId } = payload
  try {
    yield call(API.post, '/fan/invitation', { emails, roleId }, jwtToken)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// (Admin用)一覧
function* fetchFans({ payload }) {
  const { pageNum, perPage } = payload
  const { jwtToken } = yield select(getUser)

  try {
    const query = qs.stringify({ perPage })
    const { data } = yield call(
      API.fetch,
      `/fan/list/${pageNum}?${query}`,
      jwtToken
    )
    yield put(createAction(AppAdminFan.SET_LIST)(data))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// (Admin用)招待ファン一覧
function* fetchInvitedFans({ payload }) {
  const { pageNum, perPage } = payload
  const { jwtToken } = yield select(getUser)

  try {
    const query = qs.stringify({ perPage })
    const { data } = yield call(
      API.fetch,
      `/fan/list/invited/${pageNum}?${query}`,
      jwtToken
    )
    yield put(createAction(AppAdminFan.SET_INVITATION_LIST)(data))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

/**
 * iFrame
 */

function* postIFrameMessageSaga(action) {
  try {
    const { iWindow, type, payload } = action.payload
    iWindow.postMessage({ type, payload }, '*')
  } catch (err) {
    yield put(setCommonError(err))
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

const userSaga = [
  takeLatest(User.SIGNUP_REQUEST, signupUser),
  takeLatest(User.SIGNIN_REQUEST, signin),
  takeLatest(User.AUTH_ADMIN_REQUEST, signupAdmin),
  takeLatest(User.SAVE_PROFILE_REQUEST, saveUserProfile),
  takeLatest(User.FETCH_REQUEST, fetchUser),
  takeLatest(User.UPDATE_LOGINED_AT_REQUEST, updateLoginedAt),
  takeLatest(User.FETCH_CODE_INFO_REQUEST, fetchCodeInfo)
]

const siteSaga = [
  takeLatest(SiteState.SAVE_REQUEST, saveSiteState),
  takeLatest(SiteState.FETCH_REQUEST, fetchSiteState)
]

const appSaga = [
  takeLatest(AppTalkRoom.FETCH_REQUEST, fetchTalkContents),
  takeLatest(AppVoice.FETCH_REQUEST, fetchVoiceContents),
  takeLatest(AppNews.FETCH_REQUEST, fetchNewsContents),
  takeLatest(AppMypage.FETCH_REQUEST, fetchMypageContents),

  takeLatest(AppPost.FETCH_REQUEST, fetchPost),
  takeEvery(AppPost.FETCH_COMMENTS_REQUEST, fetchComments),
  takeLatest(AppPost.SAVE_REQUEST, savePost),
  takeLatest(AppPost.SAVE_COMMENT_REQUEST, saveComment),
  takeLatest(AppPost.SAVE_LIKE_REQUEST, saveLike),
  takeLatest(AppPost.SAVE_VOTE_REQUEST, saveVote)
]

const appAdminSaga = [
  takeLatest(AppAdminPost.SAVE_REQUEST, savePost),
  takeLatest(AppAdminPost.FETCH_REQUEST, fetchPost),
  takeLatest(AppAdminPost.FETCH_LIST_REQUEST, fetchPosts),

  takeLatest(AppAdminFan.SAVE_INVITATION_REQUEST, saveInvitation),
  takeLatest(AppAdminFan.FETCH_LIST_REQUEST, fetchFans),
  takeLatest(AppAdminFan.FETCH_INVITATION_LIST_REQUEST, fetchInvitedFans)
]

function* rootSaga() {
  yield all([
    ...userSaga,
    ...siteSaga,
    ...appSaga,
    ...appAdminSaga,
    takeLatest(IFrame.POST_MESSAGE, postIFrameMessageSaga)
  ])
}

export default rootSaga
