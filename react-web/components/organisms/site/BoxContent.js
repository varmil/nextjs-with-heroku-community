import React from 'react'
import PropTypes from 'prop-types'
// import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import fecha from 'fecha'
import { Router } from 'routes'
import IconButton from '@material-ui/core/IconButton'
import MultiLineHashtagText from 'components/atoms/MultiLineHashtagText'
import VoteButton from 'components/atoms/VoteButton'
import AvatarAndName from 'components/molecules/AvatarAndName'
import MoreVertMenu from 'components/molecules/MoreVertMenu'
import Photos from 'components/organisms/site/Photos'
import CommentZone from 'components/organisms/site/box/CommentZone'
import { createAction } from 'redux-actions'
import { AppPost } from 'constants/ActionTypes'
import Color from 'constants/Color'
import autosize from 'autosize'
import BoxType from '/../shared/constants/BoxType'

const AVATAR_SIZE = 44
// アンカーで飛んだときになんとなく真ん中あたりに表示するため
const OFFSET_IMG_TOP = -100
const SCROLL_BOTTOM = 33333
const FOOTER_FONTSIZE = 16

const INITIAL_PAGE = 1
const FOCUS_TYPE = {
  Scroll: 'Scroll',
  ScrollAndFocus: 'ScrollAndFocus'
}

/**
 * Voice用。
 */
export const VoteCounter = props => (
  <React.Fragment>
    <div className={`wrap py-2 ${props.className}`}>
      <div className="mb-2">
        <span>ただいまの投票数</span>
        <span className="voteNum ml-2">{props.count}</span>
      </div>

      {props.showDeadline && (
        <div className="deadline">
          期限：{fecha.format(new Date(props.deadline), 'YYYY-MM-DD hh:mm')}まで
        </div>
      )}

      {props.showButton && <VoteButton route={props.route} />}

      <style jsx>{`
        span {
          font-size: 13px;
        }
        .wrap {
          margin: 0 auto;
          text-align: center;
          background-color: #e8e8e8;
        }

        .voteNum {
          font-size: 20px;
          color: #1d72b4;
        }

        .deadline {
          color: gray;
          font-size: 11px;
        }
      `}</style>
    </div>
  </React.Fragment>
)

/**
 * 折りたたみ状態の記事本文
 */
class FoldText extends React.Component {
  state = {
    height: 0
  }

  componentDidMount() {
    const { id } = this.props
    const dom = document.querySelector(`#foldText${id}`)
    const height = dom ? dom.clientHeight : 0
    this.setState({ ...this.state, height })
  }

  render() {
    const TEXT_HEIGHT_OF_NOT_EXPAND = 95
    const CLASS_GRADATION = 'gradation'

    const { onClick, id, children } = this.props
    const { height } = this.state
    const showReadMore = height >= TEXT_HEIGHT_OF_NOT_EXPAND
    const gradationClass = showReadMore ? CLASS_GRADATION : ''

    return (
      <React.Fragment>
        <div onClick={onClick}>
          <div id={`foldText${id}`} className={`foldText ${gradationClass}`}>
            <MultiLineHashtagText>{children}</MultiLineHashtagText>
          </div>

          {showReadMore && <div>...もっとみる</div>}
        </div>

        <style jsx>{`
          a {
            color: inherit;
          }
          span {
            color: gray;
          }

          .foldText {
            position: relative;
            max-height: ${TEXT_HEIGHT_OF_NOT_EXPAND}px;
            overflow: hidden;
          }

          .foldText.${CLASS_GRADATION}::after {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            content: '';
            width: 100%;
            height: 50%;
            background: linear-gradient(
              rgba(255, 255, 255, 0) 0,
              rgba(255, 255, 255, 0.7) 20%,
              rgba(255, 255, 255, 1) 80%
            );
          }
        `}</style>
      </React.Fragment>
    )
  }
}

/**
 * LIKE FIXME: なぜかLIKEするたびにBoxContentがUnmountされる
 * https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 */
class LikeButton extends React.Component {
  state = {
    nowLoading: false
  }

  componentDidMount() {
    // callbackされるときにUnmountedなことがあるので。
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  onLikeToggle(e) {
    const { dispatch, id, PostLikes } = this.props
    let upOrDown = null

    this.setState({ nowLoading: true })

    // 最初のLIKE or current is DOWN
    if (isEmpty(PostLikes) || !PostLikes[0].upOrDown) {
      // console.log('next state is UP')
      upOrDown = true
    } else {
      // console.log('next state is DOWN')
      upOrDown = false
    }

    const successCb = res => {
      this._mounted && this.setState({ nowLoading: false })
    }
    dispatch(
      createAction(AppPost.SAVE_LIKE_REQUEST)({
        postId: id,
        upOrDown,
        successCb
      })
    )
  }

  getIconClass() {
    return this.state.nowLoading ? 'fa-spinner' : 'fa-heart'
  }

  render() {
    const { PostLikes, like } = this.props
    const { nowLoading } = this.state
    return (
      <IconButton
        className="mr-1"
        style={{
          fontSize: FOOTER_FONTSIZE,
          // LIKE済みなら青色に
          color:
            !isEmpty(PostLikes) && PostLikes[0].upOrDown
              ? Color.MAIN_BLUE
              : 'inherit'
        }}
        onClick={this.onLikeToggle.bind(this)}
        disabled={nowLoading}
      >
        <i className={`fas ${this.getIconClass()} mr-1`} /> {like}
      </IconButton>
    )
  }
}

/**
 * 記事一覧用と詳細表示双方を担う
 */
class BoxContent extends React.Component {
  state = {
    expandBody: this.props.expandBody,
    comment: ''
  }

  constructor(props) {
    super(props)
    this.commentInput = React.createRef()

    let link
    switch (props.boxType) {
      // voice専用リンク
      case BoxType.index.voice:
        link = `/view/post/${props.id}/voice/option`
        break
      // 汎用リンク
      default:
        link = `/view/post/${props.boxType}/${props.id}`
    }
    this.postLink = link
  }

  componentDidMount() {
    if (this.commentInput) {
      autosize(this.commentInput)
    }

    // # hash で img がついていればスクロールする
    const hash = window.location.hash.replace('#', '')
    const img = document.getElementById(hash)
    if (img) {
      window.scrollTo(0, img.offsetTop + OFFSET_IMG_TOP)
    }
  }

  // コメントはクライアントで読み込むのでFocusするタイミングはここ
  onLoadComment(pageNum) {
    const { focus } = this.props

    if (pageNum === INITIAL_PAGE && this.commentInput && focus) {
      window.scrollTo(0, SCROLL_BOTTOM)
      if (focus === FOCUS_TYPE.ScrollAndFocus) this.commentInput.focus()
    }
  }

  createHeader(isExpanded) {
    const props = this.props
    if (isExpanded) {
      return (
        <div className="row">
          <div
            className="backIcon col-2 p-0 text-center"
            onClick={() => Router.back()}
          >
            <i className="fas fa-chevron-left" />
          </div>
          <div className="ava col-auto p-0">
            <AvatarAndName
              size={AVATAR_SIZE}
              name={props.name}
              src={props.iconPath}
              userId={props.posterId}
            />
          </div>

          <style jsx>{`
            .row {
              width: 100%;
            }

            .backIcon {
              width: 40px;
              line-height: 44px;
              font-size: 24px;
            }
          `}</style>
        </div>
      )
    } else {
      return (
        <React.Fragment>
          <AvatarAndName
            size={AVATAR_SIZE}
            name={props.name}
            src={props.iconPath}
            userId={props.posterId}
          />
        </React.Fragment>
      )
    }
  }

  createBody(isExpanded) {
    const { showDetail, body, id } = this.props

    if (isExpanded || showDetail) {
      return <MultiLineHashtagText>{body}</MultiLineHashtagText>
    } else {
      return (
        <FoldText
          id={id}
          onClick={() => this.setState({ ...this.state, expandBody: true })}
        >
          {body}
        </FoldText>
      )
    }
  }

  createGoingVote() {
    const { goingVote, Voice } = this.props
    if (!goingVote) return null
    return (
      <div className="mt-2 mb-3 px-5">
        <VoteCounter
          count={Voice.count || 0}
          showButton={true}
          route={this.postLink}
        />
      </div>
    )
  }

  createCommentButtonAndText() {
    // comments === false なら、吹き出しだけ表示してクリックハンドラも無効化
    const { comment, showDetail, comments } = this.props
    const disableComment = comments === false

    let onClick = () => {}
    if (disableComment) {
      // do nothing
    } else if (showDetail) {
      // 記事詳細画面
      onClick = shouldFocus => {
        window.scrollTo(0, SCROLL_BOTTOM)
        if (shouldFocus) this.commentInput.focus()
      }
    } else {
      // 一覧 --> 詳細へリンクしてさらにコメントボックスへFocus
      onClick = async shouldFocus => {
        const q = shouldFocus ? FOCUS_TYPE.ScrollAndFocus : FOCUS_TYPE.Scroll
        await Router.pushRoute(`${this.postLink}?focus=${q}`)
      }
    }

    const DoCommentText = props => {
      if (disableComment) return null
      return (
        <span
          onClick={() => onClick(true)}
          style={{
            position: 'relative',
            top: 2
          }}
        >
          <a>コメントする</a>
        </span>
      )
    }

    return (
      <React.Fragment>
        <IconButton
          className="mr-2"
          style={{ fontSize: FOOTER_FONTSIZE }}
          onClick={() => onClick(false)}
        >
          <i className="fas fa-comment mr-1" /> {comment}
        </IconButton>
        <DoCommentText disableComment={disableComment} />
      </React.Fragment>
    )
  }

  createCommentPortal() {
    // const node = typeof window === 'undefined' ? null : document.body
    const isEmptyComment = this.state.comment.length === 0

    const onSubmitComment = e => {
      const { dispatch, id } = this.props
      const { comment } = this.state
      const successCb = async res => {
        this.setState({ ...this.state, comment: '' })
        autosize.update(this.commentInput)
        window.scrollTo(0, SCROLL_BOTTOM)
      }
      dispatch(
        createAction(AppPost.SAVE_COMMENT_REQUEST)({
          postId: id,
          body: comment,
          successCb
        })
      )
    }

    return (
      <React.Fragment>
        <div className="commentForm input-group">
          <textarea
            type="text"
            rows="1"
            ref={input => {
              this.commentInput = input
            }}
            className="form-control"
            placeholder="コメントする..."
            value={this.state.comment}
            onChange={e =>
              this.setState({ ...this.state, comment: e.target.value })
            }
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={onSubmitComment}
              disabled={isEmptyComment}
            >
              <i className="far fa-paper-plane" />
            </button>
          </div>
        </div>

        <style jsx>{`
          .form-control:focus {
            border-color: #ced4da !important;
            box-shadow: none !important;
          }

          .btn.btn-outline-secondary {
            border-color: #ced4da !important;
            color: ${!isEmptyComment ? Color.MAIN_BLUE : '#ced4da'};
          }

          button i {
            position: relative;
            left: -1px;
          }
        `}</style>
      </React.Fragment>
    )
  }

  createMainContent() {
    const TEXT_FONT_SIZE = 14
    const state = this.state
    const props = this.props
    const Body = (
      <div key="body" className="card-body container py-2 px-5">
        <h5 className="card-title mb-2">{props.title}</h5>
        <div className="card-text">{this.createBody(state.expandBody)}</div>

        <style jsx>{`
          .card-text {
            font-size: ${TEXT_FONT_SIZE}px;
            color: #505050;
            white-space: normal;
          }

          h5 {
            font-size: ${TEXT_FONT_SIZE}px;
            font-weight: bold;
          }
        `}</style>
      </div>
    )

    const Photo =
      props.images && props.images.length > 0 ? (
        <div key="photo" className="mb-3 px-5">
          <Photos
            showDetail={props.showDetail}
            images={props.images}
            route={this.postLink}
          />
        </div>
      ) : null

    return props.topPhoto ? [Photo, Body] : [Body, Photo]
  }

  render() {
    const props = this.props
    const INITIAL_COMMENT_NUM = 3

    return (
      <div className={`cardWrap`} style={props.style}>
        <div className={`card`}>
          <div className="card-header p-2">
            {this.createHeader(props.showDetail)}
            <span className="date">{props.postDate}</span>
          </div>

          <div>{this.createMainContent()}</div>

          {this.createGoingVote()}

          <div className="card-footer text-center p-2">
            <LikeButton {...props} />
            {this.createCommentButtonAndText()}
          </div>

          {props.children}

          {/* コメント機能がそもそも存在しないページなら非表示 */}
          {(() => {
            if (props.comments !== false && props.showDetail) {
              return (
                <React.Fragment>
                  <CommentZone
                    key={props.id}
                    className="pt-2 px-5"
                    postId={props.id}
                    initialNum={INITIAL_COMMENT_NUM}
                    onLoad={this.onLoadComment.bind(this)}
                  />
                  {this.createCommentPortal()}
                </React.Fragment>
              )
            } else {
              return null
            }
          })()}
        </div>

        {/* 自分の投稿記事ならコンテキストメニュー表示 */}
        {props.posterId === props.user.id && (
          <div className="moreVert">
            <MoreVertMenu
              size={13}
              onDelete={() => {
                props.dispatch(
                  createAction(AppPost.DELETE_REQUEST)({ id: props.id })
                )
              }}
            />
          </div>
        )}

        <style jsx>{`
            .media-body span {
              font-size: 10px;
            }

            .cardWrap {
              position: relative;
            }

            .card {
              border-radius: 0px;
              // ${props.showDetail && 'border: none'};
              border: none;
            }

            .card-header {
              background-color: initial;
              border-bottom: none;
            }

            .date {
              position: absolute;
              top: 5px;
              right: 15px;
              font-size: 0.7rem;
            }

            .card-footer {
              color: gray;
              font-size: ${FOOTER_FONTSIZE}px;
              border: none !important;
              background-color: initial !important;
            }

            .moreVert {
              position: absolute;
              right: 10px;
              top: 5px;
            }
          `}</style>
      </div>
    )
  }
}

BoxContent.propTypes = {
  // falseの場合、汎用のコメント機能をOFFにする
  comments: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  topPhoto: PropTypes.bool,
  showDetail: PropTypes.bool,
  expandBody: PropTypes.bool,
  // ページ読み込み後コメントフォームへ自動でfocusするか
  focus: PropTypes.oneOf([FOCUS_TYPE.Scroll, FOCUS_TYPE.ScrollAndFocus])
}

export default connect(state => ({
  user: state.user
}))(BoxContent)
