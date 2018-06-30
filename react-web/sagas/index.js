// import { delay } from 'redux-saga'
import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch' /* global fetch */

import { Example, IFrame, SiteTalkRoom, SitePost } from 'constants/ActionTypes'
import { failure, loadDataSuccess } from 'actions/example'
import { addTalkContents, setPost } from 'actions/site'
import { Posts, Comments } from 'stub/site'

es6promise.polyfill()

// function* runClockSaga() {
//   yield take(actionTypes.START_CLOCK)
//   while (true) {
//     yield put(tickClock(false))
//     yield call(delay, 1000)
//   }
// }

function* fetchTalkInitial({ payload }) {
  // TODO: fetch category, subBanner, then put them into store

  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const talkBoxContents = Posts
  yield put(addTalkContents(talkBoxContents))
}

function* fetchPost({ payload }) {
  const { boxType, postId } = payload

  // TODO: fetch post with boxType, postId
  // 適当な記事データを返却しておく
  const post = Posts[postId]
  const comments = Comments
  yield put(setPost({ ...post, comments }))
}

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}

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

function* watchSite() {
  return yield all([
    takeLatest(SiteTalkRoom.FETCH_INITIAL_REQUEST, fetchTalkInitial),
    takeLatest(SitePost.FETCH_REQUEST, fetchPost)
  ])
}

function* rootSaga() {
  yield all([
    fork(watchSite),

    takeLatest(Example.LOAD_DATA, loadDataSaga),
    takeLatest(IFrame.POST_MESSAGE, postIFrameMessageSaga)
  ])
}

export default rootSaga
