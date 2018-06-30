// import { delay } from 'redux-saga'
import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch' /* global fetch */

import { IFrame, AppTalkRoom, AppNews, AppPost } from 'constants/ActionTypes'
import { failure } from 'actions/example'
import { addTalkContents, addNewsContents, setPost } from 'actions/application'
import { Posts, Comments } from 'stub/app'

es6promise.polyfill()

function* fetchSiteDesign({ payload }) {
  // TODO: fetch category, subBanner, then put them into store
}

function* fetchTalkInitial({ payload }) {
  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts
  yield put(addTalkContents(data))
}

function* fetchNewsInitial({ payload }) {
  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts
  yield put(addNewsContents(data))
}

function* fetchPost({ payload }) {
  const { boxType, postId } = payload

  // TODO: fetch post with boxType, postId
  // 適当な記事データを返却しておく
  const post = Posts[postId]
  const comments = Comments
  yield put(setPost({ ...post, comments }))
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

function* watchApp() {
  return yield all([
    takeLatest(AppTalkRoom.FETCH_INITIAL_REQUEST, fetchTalkInitial),
    takeLatest(AppNews.FETCH_INITIAL_REQUEST, fetchNewsInitial),
    takeLatest(AppPost.FETCH_REQUEST, fetchPost)
  ])
}

function* rootSaga() {
  yield all([
    fork(watchApp),
    takeLatest(IFrame.POST_MESSAGE, postIFrameMessageSaga)
  ])
}

export default rootSaga
