import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { createAction } from 'redux-actions'
import { Link } from 'routes'
import { AppPost } from 'constants/ActionTypes'
import Avatar from 'components/atoms/Avatar'
import ReadMoreAndLoading from 'components/molecules/ReadMoreAndLoading'
import MoreVertMenu from 'components/molecules/MoreVertMenu'
import MultiLineHashtagMentionText from 'components/atoms/MultiLineHashtagMentionText'

// ページ番号は1から
const INITIAL_PAGE = 1
// 一回のFETCHでとってくる件数。
const PER_PAGE = 10

/**
 * 各コメント
 */
class Comments extends React.Component {
  render() {
    const { data, user, onDelete } = this.props

    const mapped = data.filter(e => !isEmpty(e)).map((e, i) => (
      <div key={e.id + uniqueId()} className="row justify-content-around my-3">
        <Avatar className="col-2 px-0" src={e.iconPath} />
        <div className="col-9 body">
          <Link route={`/view/mypage/${e.commenterId}`}>
            <a>{e.name}</a>
          </Link>
          <div>
            <MultiLineHashtagMentionText>{e.body}</MultiLineHashtagMentionText>
          </div>
        </div>

        {/* 自分のコメントならコンテキストメニュー表示 */}
        {e.commenterId === user.id && (
          <div className="moreVert">
            <MoreVertMenu size={13} onDelete={() => onDelete(e.id)} />
          </div>
        )}

        <style jsx>{`
          a {
            color: #2b6eb2;
            font-weight: bold;
          }

          .row {
            position: relative;
          }

          .body {
            background-color: #eff1f3;
            border-radius: 15px;
            padding: 10px 20px;
          }

          .moreVert {
            position: absolute;
            right: 0;
            top: -6px;
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
    const { dispatch, postId, initialNum, index, onLoad } = this.props
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

      // 読み込み終了時コールバック
      onLoad && onLoad(pageNum)
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

  render() {
    const props = this.props
    const { nowLoading, hasMore } = this.state

    // 外から渡されていればそちらを優先する
    const comments = Array.isArray(props.comments)
      ? props.comments
      : props.defaultComments
    const copiedArray = [...comments].reverse()

    return (
      <div className={`comments w-100 mx-auto ${props.className || ''}`}>
        <ReadMoreAndLoading
          text={'以前のコメントを見る'}
          nowLoading={nowLoading}
          hasMore={hasMore}
          onClick={this.onClickLoad}
        />

        <div className="commentsPost my-3 mb-5">
          <Comments
            data={copiedArray}
            user={props.user}
            onDelete={id => {
              props.dispatch(
                createAction(AppPost.DELETE_COMMENT_REQUEST)({
                  postId: props.postId,
                  commentId: id
                })
              )
            }}
          />
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
  // storeから拾う
  defaultComments: PropTypes.array,
  // １ページ目の表示件数
  initialNum: PropTypes.number,

  // 外から渡す（voice::choiceIndexなど）
  comments: PropTypes.array,
  // 1POST内に複数の種類のコメントがある場合、そのindex（voice::choiceIndexなど）
  index: PropTypes.number
}

export default connect(state => ({
  user: state.user,
  defaultComments: state.app.post.comments
}))(CommentZone)
