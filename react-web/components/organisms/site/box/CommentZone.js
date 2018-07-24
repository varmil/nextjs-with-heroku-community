import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { createAction } from 'redux-actions'
import { Link } from 'routes'
import LinearProgress from '@material-ui/core/LinearProgress'
import { AppPost } from 'constants/ActionTypes'
import Avatar from 'components/atoms/Avatar'

// ページ番号は1から
const INITIAL_PAGE = 1
// 一回のFETCHでとってくる件数。
const PER_PAGE = 10

/**
 * 各コメント
 */
class Comments extends React.Component {
  render() {
    const { data } = this.props

    const mapped = data.filter(e => !isEmpty(e)).map((e, i) => (
      <div key={e.id + uniqueId()} className="row justify-content-around my-3">
        <Avatar className="col-2 px-0" src={e.iconPath} />
        <div className="col-9 body">
          <Link route={`/view/mypage/${e.commenterId}`}>
            <a>{e.name}</a>
          </Link>
          <div>{e.body}</div>
        </div>

        <style jsx>{`
          a {
            color: #2b6eb2;
            font-weight: bold;
          }

          .body {
            background-color: #eff1f3;
            border-radius: 15px;
            padding: 10px 20px;
          }
        `}</style>
      </div>
    ))

    return mapped
  }
}

/**
 * コメント一覧表示ゾーン
 */
class CommentZone extends React.Component {
  state = { nextPageNum: INITIAL_PAGE, hasMore: true, nowLoading: false }

  // このコンポーネントがMountされたときに最初の読み込みを行う
  componentDidMount() {
    this.loadPage(INITIAL_PAGE)
  }

  loadPage(pageNum) {
    const { dispatch, postId, initialNum, index } = this.props
    const { nowLoading } = this.state
    console.log('next pageNum', pageNum, this.state)

    if (nowLoading) return
    this.setState({ ...this.state, nowLoading: true })

    const successCb = data => {
      // 結果配列が埋まっていれば、hasMoreをたてる
      this.setState({
        ...this.state,
        nextPageNum: pageNum + 1,
        hasMore: Array.isArray(data) && data.length > 0,
        nowLoading: false
      })
    }
    dispatch(
      createAction(AppPost.FETCH_COMMENTS_REQUEST)({
        postId,
        pageNum,
        perPage: PER_PAGE,
        initialOffset: initialNum, // 最初に表示されてる件数とページングの件数は必ずしも一致しない
        successCb,

        // --- option ---
        index
      })
    )
  }

  // 次ページ読み込み
  onClickLoad = () => {
    this.loadPage(this.state.nextPageNum)
  }

  createReadMoreAndLoading() {
    const { nowLoading, hasMore } = this.state

    // 全コメント表示済みなら何も出さない
    if (!hasMore) return null

    // loading表示
    if (nowLoading) {
      return (
        <div className="text-center">
          <LinearProgress />
        </div>
      )
    }

    return (
      <div className="load my-3 text-center" onClick={this.onClickLoad}>
        以前のコメントを見る
        <style jsx>{`
          .load {
            color: #2b6eb2;
            font-size: 13px;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }

  render() {
    const props = this.props

    // 外から渡されていればそちらを優先する
    const comments = Array.isArray(props.comments)
      ? props.comments
      : props.defaultComments
    const copiedArray = [...comments].reverse()

    return (
      <div className={`comments w-100 mx-auto ${props.className || ''}`}>
        {this.createReadMoreAndLoading()}

        <div className="commentsPost my-3 mb-5">
          {/* {copiedArray.map((e, i) => ( */}
          <Comments data={copiedArray} />
          {/* ))} */}
        </div>

        <style jsx>{`
          .commentsPost {
            font-size: 12px;
          }
        `}</style>
      </div>
    )
  }
}

CommentZone.propTypes = {
  postId: PropTypes.number.isRequired,
  // 外から渡す
  comments: PropTypes.array,
  // storeから拾う
  defaultComments: PropTypes.array,
  // １ページ目の表示件数
  initialNum: PropTypes.number,

  // 1POST内に複数の種類のコメントがある場合、そのindex（choiceIndexなど）
  index: PropTypes.number
}

export default connect(state => ({
  defaultComments: state.app.post.comments
}))(CommentZone)
