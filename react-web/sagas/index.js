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
import API from 'utils/API'

function* signinUser({ payload }) {
  const res = yield call(API.post, '/signin', payload)
  const data = yield call([res, 'text'])
  console.info('SIGNIN', res, data)
  // console.info('SIGNIN', res.ok, res.statusText, res.json())
  // TODO:
  // yield put(loadDataSuccess(data))
}

function* signupUser({ payload }) {
  const res = yield call(API.post, '/signup', { ...payload, isAdmin: false })
  console.info('SIGNUP', res.ok, res.statusText, res.json())
  // TODO:
  // yield put(loadDataSuccess(data))
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
function* watchUser() {
  return yield all([
    takeLatest(User.SIGNIN_REQUEST, signinUser),
    takeLatest(User.SIGNUP_REQUEST, signupUser)
    // takeLatest(User.FETCH_REQUEST, fetchUser)
  ])
}

function* watchApp() {
  return yield all([
    takeLatest(AppTalkRoom.FETCH_INITIAL_REQUEST, fetchTalkInitial),
    takeLatest(AppVoice.FETCH_INITIAL_REQUEST, fetchVoiceInitial),
    takeLatest(AppNews.FETCH_INITIAL_REQUEST, fetchNewsInitial),
    takeLatest(AppPost.FETCH_REQUEST, fetchPost)
  ])
}

function* rootSaga() {
  yield all([
    fork(watchUser),
    fork(watchApp),
    takeLatest(IFrame.POST_MESSAGE, postIFrameMessageSaga)
  ])
}

export default rootSaga
