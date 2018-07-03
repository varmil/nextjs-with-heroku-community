// import { delay } from 'redux-saga'
import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
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

function* authenticate({ payload }) {
  const { url, email, password, successCb, errCb } = payload
  const res = yield call(API.post, url, { email, password })

  if (!res.ok) return yield call(errCb, res)

  try {
    // set user data to cookie and store
    const { token } = yield call([res, 'json'])
    setCookie(Rule.COOKIE_JWT_TOKEN, token)
    yield put(createAction(User.AUTHENTICATE)(token))
    yield call(successCb, res)
  } catch (e) {
    console.warn('maybe response is not json')
    return yield call(errCb, res)
  }
}

function* fetchSiteDesign({ payload }) {
  // TODO: fetch category, subBanner, then put them into store
}

function* fetchTalkInitial({ payload }) {
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
  takeLatest(User.AUTH_REQUEST, authenticate)
  // takeLatest(User.FETCH_REQUEST, fetchUser)
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
