// import { delay } from 'redux-saga'
import { all, fork, call, put, select, takeLatest } from 'redux-saga/effects'
import {
  User,
  IFrame,
  AppTalkRoom,
  AppVoice,
  AppNews,
  AppMypage,
  AppPost,
  AppAdminPost
} from 'constants/ActionTypes'
import {
  addTalkContents,
  addVoiceContents,
  addNewsContents,
  addMypageContents,
  setPost,
  setCommonError
} from 'actions/application'
import { Posts, Comments, VoteOptions } from 'stub/app'
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
    // yield put(createAction(User.FETCH_REQUEST)(jwtToken))
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

function* fetchSiteDesign({ payload }) {
  // TODO: fetch category, subBanner, then put them into store
}

function* fetchTalk({ payload }) {
  // how to use select()
  // const token = yield select(getJWTToken)
  // const res = yield call(API.fetch, '/view/home', token)

  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.index.talk]
  yield put(addTalkContents(data))
}

function* fetchVoice({ payload }) {
  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.index.voice]
  yield put(addVoiceContents(data))
}

function* fetchNews({ payload }) {
  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.index.news]
  yield put(addNewsContents(data))
}

function* fetchMypage({ payload }) {
  // TODO: 仮でNEWSを入れておく
  const data = Posts[BoxType.index.news]
  yield put(addMypageContents(data))
}

/**
 * POST
 */

function* fetchPosts({ payload }) {
  const { pageNum } = payload
  const { jwtToken } = yield select(getUser)
  try {
    const { data } = yield call(API.fetch, `/post/list/${pageNum}`, jwtToken)
    const action = createAction(AppAdminPost.SET_LIST)
    yield put(action(data))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* fetchPost({ payload }) {
  const { postId } = payload
  const { jwtToken } = yield select(getUser)
  try {
    const { data } = yield call(API.fetch, `/post/${postId}`, jwtToken)
    const action = createAction(AppAdminPost.SET)
    yield put(action(data))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// function* fetchPost({ payload }) {
//   const { boxType, postId } = payload
//
//   // TODO: fetch post with boxType, postId
//   // 適当な記事データを返却しておく
//   const post = Posts[boxType][postId]
//   const comments = Comments
//   const voteOptions = VoteOptions || []
//   yield put(setPost({ ...post, comments, voteOptions }))
// }

function* savePost({ payload }) {
  const {
    successCb,
    errCb,
    // 必須
    boxType,
    title,
    body,
    // 任意
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
  utilFiles.append(formData, files)
  if (categoryIndex) {
    formData.append('categoryIndex', categoryIndex)
  }
  Array.isArray(options) &&
    options.forEach(option => {
      formData.append('options[]', option)
    })
  if (deadline) {
    formData.append('deadline', deadline)
  }

  try {
    const res = yield call(API.post, '/post', formData, jwtToken)
    yield call(successCb, res)
  } catch (e) {
    if (errCb) yield call(errCb, e.response)
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
  takeLatest(User.FETCH_REQUEST, fetchUser)
]

const appSaga = [
  takeLatest(AppTalkRoom.FETCH_REQUEST, fetchTalk),
  takeLatest(AppVoice.FETCH_REQUEST, fetchVoice),
  takeLatest(AppNews.FETCH_REQUEST, fetchNews),
  takeLatest(AppMypage.FETCH_REQUEST, fetchMypage),
  takeLatest(AppPost.SAVE_REQUEST, savePost),
  takeLatest(AppPost.FETCH_REQUEST, fetchPost)
]

const appAdminSaga = [
  takeLatest(AppAdminPost.SAVE_REQUEST, savePost),
  takeLatest(AppAdminPost.FETCH_REQUEST, fetchPost),
  takeLatest(AppAdminPost.FETCH_LIST_REQUEST, fetchPosts)
]

function* rootSaga() {
  yield all([
    ...userSaga,
    ...appSaga,
    ...appAdminSaga,
    takeLatest(IFrame.POST_MESSAGE, postIFrameMessageSaga)
  ])
}

export default rootSaga
