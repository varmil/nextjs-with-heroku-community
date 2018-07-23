import React from 'react'
import PropTypes from 'prop-types'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import fecha from 'fecha'
import { Link, Router } from 'routes'
import IconButton from '@material-ui/core/IconButton'
import MultiLineText from 'components/atoms/MultiLineText'
import Avatar from 'components/atoms/Avatar'
import VoteButton from 'components/atoms/VoteButton'
import AvatarAndName from 'components/molecules/AvatarAndName'
import { createAction } from 'redux-actions'
import { AppPost } from 'constants/ActionTypes'
import Color from 'constants/Color'
import autosize from 'autosize'
import LazyLoad from 'react-lazyload'
import BoxType from '/../shared/constants/BoxType'

const AVATAR_SIZE = 44
// アンカーで飛んだときになんとなく真ん中あたりに表示するため
const OFFSET_IMG_TOP = -100
const SCROLL_BOTTOM = 9999
const FOOTER_FONTSIZE = 16

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
 * コメント一覧表示ゾーン
 */
export const CommentZone = props => {
  // 最初に見えてる件数を絞る。最初に20件とか撮ってくる必要ない HACK
  const INITIAL_NUM = 3
  const sliced = props.comments.slice(0, props.initialNum || INITIAL_NUM)
  const copiedArray = [...sliced].reverse()

  return (
    <div className={`comments w-100 mx-auto ${props.className || ''}`}>
      <div className="load my-3 text-center" onClick={() => {}}>
        以前のコメントを見る
      </div>
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

        .load {
          color: #2b6eb2;
          font-size: 13px;
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

/**
 * 画像一覧。一覧用と詳細表示をshowDetailで切り替える
 */
const Photos = props => {
  /**
   * 一覧用の個別画像
   */
  const PreviewImage = props => {
    const HEIGHT = 110
    return (
      <React.Fragment>
        <div
          onClick={async () => {
            const id = `img${props.index}`
            await Router.pushRoute(`${props.route}#${id}`)
            const top = document.getElementById(id).offsetTop
            window.scrollTo(0, top + OFFSET_IMG_TOP)
          }}
        >
          <LazyLoad height={HEIGHT} once>
            <img className="card-img-top" src={props.src} alt="" />
          </LazyLoad>
        </div>
        <style jsx>{`
          img {
            border-radius: 0;
            object-fit: cover;
            height: ${HEIGHT}px;
          }
        `}</style>
      </React.Fragment>
    )
  }

  if (props.showDetail) {
    return (
      <React.Fragment>
        {props.images.map((src, i) => (
          <div key={i} id={`img${i}`}>
            <img src={src} className="card-img-top my-2" alt="" />
          </div>
        ))}
      </React.Fragment>
    )
  } else {
    const length = props.images.length
    let result = null
    switch (length) {
      case 1:
        result = (
          <React.Fragment>
            <div className="row">
              <div className="col-12 px-0">
                <PreviewImage
                  route={props.route}
                  src={props.images[0]}
                  index={0}
                />
              </div>
            </div>
          </React.Fragment>
        )
        break

      case 2:
      case 4:
        result = (
          <React.Fragment>
            <div className="row">
              {props.images.map((src, i) => (
                <div key={i} className="col-6 px-0">
                  <PreviewImage route={props.route} src={src} index={i} />
                </div>
              ))}
            </div>
          </React.Fragment>
        )
        break

      case 3:
        result = (
          <React.Fragment>
            <div className="row">
              <div className="col-12 px-0">
                <PreviewImage
                  route={props.route}
                  src={props.images[0]}
                  index={0}
                />
              </div>
              {props.images.slice(1).map((src, i) => (
                <div key={i} className="col-6 px-0">
                  <PreviewImage route={props.route} src={src} index={i + 1} />
                </div>
              ))}
            </div>
          </React.Fragment>
        )
        break
      default:
    }
    return result
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

    if (this.commentInput && this.props.focus) {
      this.commentInput.focus()
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
          />
        </React.Fragment>
      )
    }
  }

  createBody(isExpanded) {
    const props = this.props
    if (isExpanded || props.showDetail) {
      return <MultiLineText>{props.body}</MultiLineText>
    } else {
      const sliced = `${props.body.slice(0, 60)}...`
      return (
        <React.Fragment>
          <div
            onClick={() => this.setState({ ...this.state, expandBody: true })}
          >
            <MultiLineText>{sliced}</MultiLineText>
            <span>もっとみる</span>
          </div>

          <style jsx>{`
            a {
              color: inherit;
            }
            span {
              color: gray;
            }
          `}</style>
        </React.Fragment>
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

    let onClick = null
    if (disableComment) {
      // do nothing
    } else if (showDetail) {
      // 記事詳細画面
      onClick = () => {
        window.scrollTo(0, SCROLL_BOTTOM)
        this.commentInput.focus()
      }
    } else {
      // 一覧 --> 詳細へリンクしてさらにコメントボックスへFocus
      onClick = async () => {
        await Router.pushRoute(`${this.postLink}?focus=true`)
      }
    }

    const DoCommentText = props => {
      if (disableComment) return null
      return (
        <span
          onClick={onClick}
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
          onClick={onClick}
        >
          <i className="fas fa-comment mr-1" /> {comment}
        </IconButton>
        <DoCommentText disableComment={disableComment} />
      </React.Fragment>
    )
  }

  createCommentPortal() {
    const node = typeof window === 'undefined' ? null : document.body
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
      <Portal node={node}>
        <div className="commentForm fixed-bottom input-group">
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
      </Portal>
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

  onLikeToggle(e) {
    const { dispatch, id, PostLikes } = this.props
    let upOrDown = null

    // 最初のLIKE or current is DOWN
    if (isEmpty(PostLikes) || !PostLikes[0].upOrDown) {
      console.log('next state is UP')
      upOrDown = true
    } else {
      console.log('next state is DOWN')
      upOrDown = false
    }

    dispatch(
      createAction(AppPost.SAVE_LIKE_REQUEST)({
        postId: id,
        upOrDown
      })
    )
  }

  render() {
    const props = this.props
    const { PostLikes } = this.props
    return (
      <div style={props.style}>
        <div className={`card`}>
          <div className="card-header p-2">
            {this.createHeader(props.showDetail)}
            <span className="date">{props.postDate}</span>
          </div>

          <div className="">{this.createMainContent()}</div>

          {this.createGoingVote()}

          <div className="card-footer text-center p-2">
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
            >
              <i className="fas fa-heart mr-1" /> {props.like}
            </IconButton>
            {this.createCommentButtonAndText()}
          </div>

          {this.props.children}

          {/* コメント機能がそもそも存在しないページなら非表示 */}
          {(() => {
            if (props.comments !== false && props.showDetail) {
              return (
                <React.Fragment>
                  <CommentZone
                    className="pt-2 px-5"
                    comments={props.comments}
                  />
                  {this.createCommentPortal()}
                </React.Fragment>
              )
            } else {
              return null
            }
          })()}

          <style jsx>{`
            .media-body span {
              font-size: 10px;
            }

            .card {
              border-radius: 0px;
              ${props.showDetail && 'border: none'};
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
          `}</style>
        </div>
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
  focus: PropTypes.bool
}

export default connect()(BoxContent)
