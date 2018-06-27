import { delay } from 'redux-saga'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch' /* global fetch */

import { Example, IFrame } from 'constants/ActionTypes'
import { failure, loadDataSuccess } from 'actions/example'

es6promise.polyfill()

// function* runClockSaga() {
//   yield take(actionTypes.START_CLOCK)
//   while (true) {
//     yield put(tickClock(false))
//     yield call(delay, 1000)
//   }
// }

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
    // yield delay(100)
  } catch (err) {
    yield put(failure(err))
  }
}

function* rootSaga() {
  yield all([
    // call(runClockSaga),
    takeLatest(Example.LOAD_DATA, loadDataSaga),
    takeLatest(IFrame.POST_MESSAGE, postIFrameMessageSaga)
  ])
}

export default rootSaga
