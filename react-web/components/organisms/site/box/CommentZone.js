import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Link } from 'routes'
import LinearProgress from '@material-ui/core/LinearProgress'
import { AppPost } from 'constants/ActionTypes'
import Avatar from 'components/atoms/Avatar'

// ページ番号は1から
const INITIAL_PAGE = 1
// 一回のFETCHでとってくる件数。
const PER_PAGE = 6

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
    const { dispatch, postId, initialNum } = this.props
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
        successCb
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

    // const sliced = props.comments.slice(0, props.initialNum || INITIAL_NUM)
    const copiedArray = [...props.comments].reverse()

    return (
      <div className={`comments w-100 mx-auto ${props.className || ''}`}>
        {this.createReadMoreAndLoading()}

        <div className="commentsPost my-3 mb-5">
          {copiedArray.map((e, i) => (
            <div key={e.id} className="row justify-content-around my-3">
              <Avatar className="col-2 px-0" src={e.iconPath} />
              <div className="col-9 body">
                <Link route={`/view/mypage/${e.commenterId}`}>
                  <a>{e.name}</a>
                </Link>
                <div>{e.body}</div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          a {
            color: #2b6eb2;
            font-weight: bold;
          }

          .commentsPost {
            font-size: 12px;
          }

          .body {
            background-color: #eff1f3;
            border-radius: 15px;
            padding: 10px 20px;
          }
        `}</style>
      </div>
    )
  }
}

CommentZone.propTypes = {
  postId: PropTypes.number,
  // falseの場合、汎用のコメント機能をOFFにする
  comments: PropTypes.array,
  initialNum: PropTypes.number
}

export default connect(state => ({
  comments: state.app.post.comments
}))(CommentZone)
