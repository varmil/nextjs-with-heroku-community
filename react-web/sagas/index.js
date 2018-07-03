// import { delay } from 'redux-saga'
import { all, fork, call, put, select, takeLatest } from 'redux-saga/effects'
import {
  User,
  IFrame,
  AppTalkRoom,
  AppVoice,
  AppNews,
  AppPost
} from 'constants/ActionTypes'
import { failure } from 'actions/example'
import {
  addTalkContents,
  addVoiceContents,
  addNewsContents,
  setPost
} from 'actions/application'
import { Posts, Comments, VoteOptions } from 'stub/app'
import BoxType from 'constants/BoxType'
import { createAction } from 'redux-actions'
import { setCookie, removeCookie } from 'utils/cookie'
import API from 'utils/API'
import Rule from 'constants/Rule'

// select JWTToken !
const getJWTToken = state => state.user.jwtToken

function* authenticate({ payload }) {
  const { url, email, password, successCb, errCb } = payload
  const res = yield call(API.post, url, { email, password })
  if (!res.status === 200) return yield call(errCb, res)

  // set user data to cookie and store
  const { token } = res.data
  setCookie(Rule.COOKIE_JWT_TOKEN, token)
  yield put(createAction(User.AUTHENTICATE)(token))
  yield call(successCb, res)
}

// （初期登録、プロフィール編集？）
function* saveUserProfile({ payload }) {
  const { formData, successCb, errCb } = payload
  const res = yield call(API.post, '/user/profile', formData)
  if (!res.status === 200) return yield call(errCb, res)

  yield call(successCb, res)
}

// payload is token
function* fetchUser({ payload }) {
  const res = yield call(API.fetch, '/user', payload)
  if (res.status === 200) {
    yield put(createAction(User.SET)({ ...res.data }))
  } else {
    console.warn('failed fetch user info', res)
  }
}

function* fetchSiteDesign({ payload }) {
  // TODO: fetch category, subBanner, then put them into store
}

function* fetchTalkInitial({ payload }) {
  // how to use select()
  // const token = yield select(getJWTToken)
  // const res = yield call(API.fetch, '/view/home', token)

  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.TALK]
  yield put(addTalkContents(data))
}

function* fetchVoiceInitial({ payload }) {
  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.VOICE]
  yield put(addVoiceContents(data))
}

function* fetchNewsInitial({ payload }) {
  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.NEWS]
  yield put(addNewsContents(data))
}

function* fetchPost({ payload }) {
  const { boxType, postId } = payload

  // TODO: fetch post with boxType, postId
  // 適当な記事データを返却しておく
  const post = Posts[boxType][postId]
  const comments = Comments
  const voteOptions = VoteOptions || []
  yield put(setPost({ ...post, comments, voteOptions }))
}

// function* loadDataSaga() {
//   try {
//     const res = yield fetch('https://jsonplaceholder.typicode.com/users')
//     const data = yield res.json()
//     yield put(loadDataSuccess(data))
//   } catch (err) {
//     yield put(failure(err))
//   }
// }

function* postIFrameMessageSaga(action) {
  try {
    const { iWindow, type, payload } = action.payload
    iWindow.postMessage({ type, payload }, '*')
  } catch (err) {
    yield put(failure(err))
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

// function* watchApp() {
//   return yield all([
//     takeLatest(AppTalkRoom.FETCH_INITIAL_REQUEST, fetchTalkInitial),
//     takeLatest(AppVoice.FETCH_INITIAL_REQUEST, fetchVoiceInitial),
//     takeLatest(AppNews.FETCH_INITIAL_REQUEST, fetchNewsInitial),
//     takeLatest(AppPost.FETCH_REQUEST, fetchPost)
//   ])
// }

const userSaga = [
  takeLatest(User.AUTH_REQUEST, authenticate),
  takeLatest(User.SAVE_PROFILE_REQUEST, saveUserProfile),
  takeLatest(User.FETCH_REQUEST, fetchUser)
]

const appSaga = [
  takeLatest(AppTalkRoom.FETCH_INITIAL_REQUEST, fetchTalkInitial),
  takeLatest(AppVoice.FETCH_INITIAL_REQUEST, fetchVoiceInitial),
  takeLatest(AppNews.FETCH_INITIAL_REQUEST, fetchNewsInitial),
  takeLatest(AppPost.FETCH_REQUEST, fetchPost)
]

function* rootSaga() {
  yield all([
    ...userSaga,
    ...appSaga,
    takeLatest(IFrame.POST_MESSAGE, postIFrameMessageSaga)
  ])
}

export default rootSaga
