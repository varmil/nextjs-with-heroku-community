// import { delay } from 'redux-saga'
import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery
} from 'redux-saga/effects'
import isUndefined from 'lodash/isUndefined'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'
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
  AppSearch,
  AppNotification,
  AppPost,
  AppBadge,
  AppContact,
  AppAdminPost,
  AppAdminFan,
  AppAdminAccount,
  AppAdminLibrary
} from 'constants/ActionTypes'
import {
  addTalkContents,
  addVoiceContents,
  addNewsContents,
  addMypageContents,
  addSearchContents,
  addNotificationContents,
  addSearchPhotos,
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
  const { email, password, code, partnerUserId, successCb } = payload
  if (!code) {
    console.warn('Invitation code is null', code)
    return
  }

  try {
    const res = yield call(API.post, '/signup', {
      email,
      password,
      code,
      partnerUserId
    })
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
// initialize.jsと基本同じ感じ
function* setUserInfo(token) {
  setCookie(Rule.COOKIE_JWT_TOKEN, token)
  yield put(createAction(User.AUTHENTICATE)(token))
  yield put(createAction(User.FETCH_REQUEST)())
  yield put(createAction(SiteState.FETCH_REQUEST)())
  yield put(createAction(User.UPDATE_LOGINED_AT_REQUEST)())
}

// （初期登録、プロフィール編集？）
function* saveUserProfile({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { data, successCb } = payload
  const {
    // 共通
    email,
    password,
    files,
    // 一般ユーザ
    nickname,
    introduction,
    // 管理者
    userId,
    lastName,
    firstName,
    roleId
  } = data

  let formData = new FormData()
  utilFiles.append(formData, files)
  email && formData.append('email', email)
  password && formData.append('password', password)
  nickname && formData.append('nickname', nickname)
  introduction && formData.append('introduction', introduction)
  userId && formData.append('userId', userId)
  lastName && formData.append('lastName', lastName)
  firstName && formData.append('firstName', firstName)
  roleId && formData.append('roleId', roleId)

  try {
    const res = yield call(API.post, '/user/profile', formData, jwtToken)
    // 冗長だが、再度最新のUser情報をfetch
    yield put(createAction(User.FETCH_REQUEST)())
    yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// my user info
function* fetchUser({ payload }) {
  try {
    const { token } = payload || {}
    const jwtToken = token || (yield select(getUser)).jwtToken
    const res = yield call(API.fetch, `/user`, jwtToken)
    yield put(createAction(User.SET)({ ...res.data }))
  } catch (e) {
    console.warn('failed fetch user info', e.response.statusText)
  }
}

// other user info
function* fetchOtherUser({ payload }) {
  try {
    const { userId, action, token } = payload || {}
    const jwtToken = token || (yield select(getUser)).jwtToken
    const path = userId ? `/user/${userId}` : `/user`
    const res = yield call(API.fetch, path, jwtToken)
    yield put(createAction(action)({ ...res.data }))
  } catch (e) {
    yield put(setCommonError(e.response))
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
    const { email, roleId } = data
    // 招待コードもStoreに保存しておく（signup時に一緒にPOSTするのに使うかも）
    yield put(createAction(User.SET)({ email, roleId, invitationCode: code }))
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
    const { perPage, pageNum, released, successCb, fetchOption } = payload

    // APIサーバに投げるqsを生成
    let query = { released, perPage }

    // fetchOption展開
    if (!isEmpty(fetchOption)) {
      let { activeCategoryIndex } = fetchOption
      query = { ...query, categoryIndex: activeCategoryIndex }
    }

    const res = yield call(
      API.fetch,
      `/post/list/box/${boxType}/${pageNum || 1}?${qs.stringify(query)}`,
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

/**
 * その他 InfiniteScroll 系
 */

function* fetchMypageContents({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { perPage, pageNum, successCb, fetchOption } = payload

  try {
    let query = { perPage }

    // fetchOption展開
    if (!isEmpty(fetchOption)) {
      let { userId } = fetchOption
      query = { ...query, userId }
    }

    const res = yield call(
      API.fetch,
      `/post/list/user/${pageNum || 1}?${qs.stringify(query)}`,
      jwtToken
    )
    yield put(addMypageContents(res.data))
    if (successCb) yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// 検索結果
function* fetchSearchContents({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { perPage, pageNum, successCb, fetchOption } = payload
  try {
    const { word, onlyPhoto } = fetchOption
    if (!word) return console.warn('wordが未指定です。')

    const query = qs.stringify({ perPage, onlyPhoto })

    const res = yield call(
      API.fetch,
      `/post/list/search/${encodeURIComponent(word)}/${pageNum || 1}?${query}`,
      jwtToken
    )

    // 1ページ目なら事前にRESETしてからPUSH
    if (+pageNum === 1) {
      const resetAction = onlyPhoto
        ? createAction(AppSearch.RESET_PHOTOS)
        : createAction(AppSearch.RESET_CONTENTS)
      yield put(resetAction())
    }

    // PHOTOのみなら、photosにつめる
    const action = onlyPhoto ? addSearchPhotos : addSearchContents
    yield put(action(res.data))
    if (successCb) yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* fetchNotifications({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { perPage, pageNum, successCb } = payload

  try {
    const query = qs.stringify({ perPage })
    const res = yield call(
      API.fetch,
      `/notification/${pageNum || 1}?${query}`,
      jwtToken
    )
    yield put(addNotificationContents(res.data))
    if (successCb) yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

/**
 * NOTIFICATION
 */

function* fetchNewNotificationCount({ payload }) {
  const { jwtToken } = yield select(getUser)
  try {
    const res = yield call(API.fetch, `/notification/count`, jwtToken)
    yield put(createAction(AppNotification.SET_NOT_READ_COUNT)(res.data))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* saveReadNotifications({ payload }) {
  const { jwtToken } = yield select(getUser)
  try {
    yield call(API.post, '/notification/read', {}, jwtToken)
    // 既読情報をstoreに反映
    yield put(createAction(AppNotification.UPDATE_READ)())
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
    options
    // deadline
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
  // if (!isUndefined(deadline)) {
  //   formData.append('deadline', deadline)
  // }

  try {
    const res = yield call(API.post, '/post', formData, jwtToken)
    // HACK: 今の自分の投稿をfetchしてPREPEND
    const { data } = yield call(API.fetch, `/post/${res.data.id}`, jwtToken)
    const path = `${BoxType.slug[boxType]}.boxContents`
    yield put(createAction(AppBox.PREPEND_CONTENT)({ path, data }))
    if (successCb) yield call(successCb, res)
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

function* deletePost({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { id } = payload
  try {
    const query = qs.stringify({ id })
    yield call(API.delete, `/post?${query}`, jwtToken)
    // HACK: ページリロードしちゃうのが楽なので
    window.location.reload()
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* deleteComment({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { postId, commentId } = payload
  try {
    const query = qs.stringify({ id: commentId })
    yield call(API.delete, `/comment?${query}`, jwtToken)
    yield put(createAction(AppPost.DELETE_COMMENT)(commentId))
    yield put(createAction(AppPost.DECREMENT_COMMENT_SUM)({ postId }))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

/**
 * Badges
 */

function* fetchBadges({ payload }) {
  const { userId } = payload || {}
  const { jwtToken } = yield select(getUser)
  const path = userId ? `/badge/${userId}` : `/badge`
  try {
    const { data } = yield call(API.fetch, path, jwtToken)
    yield put(createAction(AppBadge.SET_LIST)(data))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

/**
 * Contact
 */

function* saveContact({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { type, text, successCb } = payload
  try {
    const res = yield call(API.post, '/contact', { type, text }, jwtToken)
    if (successCb) yield call(successCb, res)
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
  const { emails, roleId, successCb } = payload
  try {
    const res = yield call(
      API.post,
      '/fan/invitation',
      { emails, roleId },
      jwtToken
    )
    if (successCb) yield call(successCb, res)
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
 * Admin Accounts
 */

// (Admin用)一覧
function* fetchAdminAccounts({ payload }) {
  const { jwtToken } = yield select(getUser)
  try {
    const { data } = yield call(API.fetch, `/admin/list`, jwtToken)
    yield put(createAction(AppAdminAccount.SET_LIST)(data))
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

// { email, roleId, isNotified } = payload
function* saveAdminAccounts({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { successCb, ...data } = payload
  try {
    const res = yield call(API.post, '/admin/add', data, jwtToken)
    if (successCb) yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

/**
 * Library
 */

// { files } = payload
function* saveLibraries({ payload }) {
  const { jwtToken } = yield select(getUser)
  const { successCb, files } = payload
  try {
    let formData = new FormData()
    utilFiles.append(formData, files)

    const res = yield call(API.post, '/site/library', formData, jwtToken)
    if (successCb) yield call(successCb, res)
  } catch (e) {
    yield put(setCommonError(e.response))
  }
}

function* fetchLibraries({ payload }) {
  const { successCb } = payload || {}
  const { jwtToken } = yield select(getUser)
  try {
    const { data } = yield call(API.fetch, `/site/library`, jwtToken)
    yield put(createAction(AppAdminLibrary.SET_LIST)(data))
    if (successCb) yield call(successCb, data)
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
  takeEvery(AppSearch.FETCH_REQUEST, fetchSearchContents),

  takeEvery(AppNotification.FETCH_REQUEST, fetchNotifications),
  takeLatest(
    AppNotification.FETCH_NOT_READ_COUNT_REQUEST,
    fetchNewNotificationCount
  ),
  takeLatest(AppNotification.UPDATE_READ_REQUEST, saveReadNotifications),

  takeLatest(AppPost.FETCH_REQUEST, fetchPost),
  takeEvery(AppPost.FETCH_COMMENTS_REQUEST, fetchComments),
  takeLatest(AppPost.SAVE_REQUEST, savePost),
  takeLatest(AppPost.SAVE_COMMENT_REQUEST, saveComment),
  takeLatest(AppPost.SAVE_LIKE_REQUEST, saveLike),
  takeLatest(AppPost.SAVE_VOTE_REQUEST, saveVote),
  takeLatest(AppPost.DELETE_REQUEST, deletePost),
  takeLatest(AppPost.DELETE_COMMENT_REQUEST, deleteComment),

  takeLatest(AppMypage.FETCH_OTHER_USER_REQUEST, fetchOtherUser),
  takeLatest(AppBadge.FETCH_LIST_REQUEST, fetchBadges),

  takeLatest(AppContact.SAVE_REQUEST, saveContact)
]

const appAdminSaga = [
  takeLatest(AppAdminPost.SAVE_REQUEST, savePost),
  takeLatest(AppAdminPost.FETCH_REQUEST, fetchPost),
  takeLatest(AppAdminPost.FETCH_LIST_REQUEST, fetchPosts),

  takeLatest(AppAdminFan.SAVE_INVITATION_REQUEST, saveInvitation),
  takeLatest(AppAdminFan.FETCH_LIST_REQUEST, fetchFans),
  takeLatest(AppAdminFan.FETCH_INVITATION_LIST_REQUEST, fetchInvitedFans),

  takeLatest(AppAdminAccount.SAVE_REQUEST, saveAdminAccounts),
  takeLatest(AppAdminAccount.FETCH_LIST_REQUEST, fetchAdminAccounts),
  takeLatest(AppAdminAccount.FETCH_OTHER_ADMIN_REQUEST, fetchOtherUser),

  takeLatest(AppAdminLibrary.FETCH_LIST_REQUEST, fetchLibraries),
  takeLatest(AppAdminLibrary.SAVE_REQUEST, saveLibraries)
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
