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
  AppAdminPosts,
  AppAdminPost
} from 'constants/ActionTypes'
import { failure } from 'actions/example'
import {
  addTalkContents,
  addVoiceContents,
  addNewsContents,
  addMypageContents,
  setPost
} from 'actions/application'
import { Posts, Comments, VoteOptions } from 'stub/app'
import BoxType from '/../shared/constants/BoxType'
import { createAction } from 'redux-actions'
import { setCookie } from 'utils/cookie'
import API from 'utils/API'
import Rule from 'constants/Rule'

// select User !
const getUser = state => state.user

function* authenticate({ payload }) {
  const { url, email, password, successCb, errCb } = payload
  try {
    const res = yield call(API.post, url, { email, password })
    // set user data to cookie and store
    const { token } = res.data
    setCookie(Rule.COOKIE_JWT_TOKEN, token)
    yield put(createAction(User.AUTHENTICATE)(token))
    yield put(createAction(User.FETCH_REQUEST)(token))
    yield call(successCb, res)
  } catch (e) {
    yield call(errCb, e.response)
  }
}

// （初期登録、プロフィール編集？）
function* saveUserProfile({ payload }) {
  const { formData, successCb, errCb } = payload
  try {
    const res = yield call(API.post, '/user/profile', formData)
    yield call(successCb, res)
  } catch (e) {
    yield call(errCb, e.response)
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

function* fetchTalkInitial({ payload }) {
  // how to use select()
  // const token = yield select(getJWTToken)
  // const res = yield call(API.fetch, '/view/home', token)

  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.index.talk]
  yield put(addTalkContents(data))
}

function* fetchVoiceInitial({ payload }) {
  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.index.voice]
  yield put(addVoiceContents(data))
}

function* fetchNewsInitial({ payload }) {
  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const data = Posts[BoxType.index.news]
  yield put(addNewsContents(data))
}

function* fetchMypageInitial({ payload }) {
  // TODO: 仮でNEWSを入れておく
  const data = Posts[BoxType.index.news]
  yield put(addMypageContents(data))
}

/**
 * POST
 */

function* fetchPosts({ payload }) {
  // TODO
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
  const { id, jwtToken } = yield select(getUser)

  // 複数画像をPOSTするためにFormDataを使用する
  let formData = new FormData()
  formData.append('userId', id)
  formData.append('boxType', boxType)
  formData.append('title', title)
  formData.append('body', body)
  Array.isArray(files) &&
    files.forEach(file => {
      formData.append('image', file)
    })
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
    yield call(errCb, e.response)
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
    yield put(failure(err))
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

const userSaga = [
  takeLatest(User.AUTH_REQUEST, authenticate),
  takeLatest(User.SAVE_PROFILE_REQUEST, saveUserProfile),
  takeLatest(User.FETCH_REQUEST, fetchUser)
]

const appSaga = [
  takeLatest(AppTalkRoom.FETCH_INITIAL_REQUEST, fetchTalkInitial),
  takeLatest(AppVoice.FETCH_INITIAL_REQUEST, fetchVoiceInitial),
  takeLatest(AppNews.FETCH_INITIAL_REQUEST, fetchNewsInitial),
  takeLatest(AppMypage.FETCH_INITIAL_REQUEST, fetchMypageInitial),
  takeLatest(AppPost.FETCH_REQUEST, fetchPost)
]

const appAdminSaga = [
  takeLatest(AppAdminPost.SAVE_REQUEST, savePost),
  takeLatest(AppAdminPost.FETCH_REQUEST, fetchPost),
  takeLatest(AppAdminPosts.FETCH_REQUEST, fetchPosts)
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
