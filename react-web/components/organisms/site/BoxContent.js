import React from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import fecha from 'fecha'
import { Link, Router } from 'routes'
import IconButton from '@material-ui/core/IconButton'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import MultiLineText from 'components/atoms/MultiLineText'
import Avatar from 'components/atoms/Avatar'
import AvatarAndName from 'components/molecules/AvatarAndName'
import { createAction } from 'redux-actions'
import { AppPost } from 'constants/ActionTypes'
import Color from 'constants/Color'
import { setSuccess } from 'actions/application'
import autosize from 'autosize'
import LazyLoad from 'react-lazyload'

const AVATAR_SIZE = 44
// アンカーで飛んだときになんとなく真ん中あたりに表示するため
const OFFSET_IMG_TOP = -100
const SCROLL_BOTTOM = 9999
const FOOTER_FONTSIZE = 14

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

      {props.showButton && (
        <Link route={props.route}>
          <button type="button" className="btn">
            投票する
          </button>
        </Link>
      )}

      <style jsx>{`
        span {
          font-size: 13px;
        }
        .wrap {
          margin: 0 auto;
          text-align: center;
          background-color: #e8e8e8;
          // width: 250px;
        }

        .voteNum {
          font-size: 20px;
          color: #1d72b4;
        }

        .deadline {
          color: gray;
          font-size: 11px;
        }

        button {
          font-size: 12px;
          width: 120px;
          border-radius: 30px;
          color: white;
          background-color: ${props.voteButtonColor};
        }
      `}</style>
    </div>
  </React.Fragment>
)

class BoxContent extends React.Component {
  state = {
    expandBody: this.props.expandBody,
    comment: ''
  }

  constructor(props) {
    super(props)
    this.commentInput = React.createRef()
    this.postLink = `/view/post/${props.boxType}/${props.id}`
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
    if (isExpanded) {
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

  createPhoto(isExpanded) {
    const props = this.props
    if (isExpanded) {
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
                    route={this.postLink}
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
                    <PreviewImage route={this.postLink} src={src} index={i} />
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
                    route={this.postLink}
                    src={props.images[0]}
                    index={0}
                  />
                </div>
                {props.images.slice(1).map((src, i) => (
                  <div key={i} className="col-6 px-0">
                    <PreviewImage
                      route={this.postLink}
                      src={src}
                      index={i + 1}
                    />
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

  createGoingVote() {
    const { goingVote, Voice, voteButtonColor } = this.props
    if (!goingVote) return null
    return (
      <div className="mt-2 mb-3 px-5">
        <VoteCounter
          count={Voice.count || 0}
          showButton={true}
          voteButtonColor={voteButtonColor}
          route={this.postLink}
        />
      </div>
    )
  }

  createCommentButton(showDetail) {
    const { comment } = this.props

    let onClick = null
    if (showDetail) {
      onClick = () => {
        window.scrollTo(0, SCROLL_BOTTOM)
        this.commentInput.focus()
      }
    } else {
      onClick = async () => {
        await Router.pushRoute(`${this.postLink}?focus=true`)
      }
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
        <span
          onClick={onClick}
          style={{
            position: 'relative',
            top: 2
          }}
        >
          <a>コメントする</a>
        </span>
      </React.Fragment>
    )
  }

  createComment(isExpanded) {
    if (!isExpanded) return null
    const props = this.props
    const copiedArray = [...props.comments].reverse()
    const node = typeof window === 'undefined' ? null : document.body
    const isEmptyComment = this.state.comment.length === 0

    return (
      <div className="comments w-100 mx-auto pt-2">
        <div className="load my-3 text-center" onClick={() => {}}>
          以前のコメントを見る
        </div>
        <div className="commentsPost my-3 mb-5 px-5">
          {copiedArray.map((e, i) => (
            <div key={e.id} className="row justify-content-around my-3">
              <Avatar className="col-2 px-0" src={e.iconPath} />
              <div className="col-9 body">
                <Link route={this.postLink}>
                  <a>{e.name}</a>
                </Link>
                <div>{e.body}</div>
              </div>
            </div>
          ))}
        </div>

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
                onClick={this.onSubmitComment.bind(this)}
                disabled={isEmptyComment}
              >
                <i className="far fa-paper-plane" />
              </button>
            </div>
          </div>
        </Portal>

        <style global jsx>{`
          .form-control:focus {
            border-color: #ced4da !important;
            box-shadow: none !important;
          }
        `}</style>

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

          .btn.btn-outline-secondary {
            border-color: #ced4da !important;
            color: ${!isEmptyComment ? Color.MAIN_BLUE : '#ced4da'};
          }

          button i {
            position: relative;
            left: -1px;
          }
        `}</style>
      </div>
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
          {this.createPhoto(props.showDetail)}
        </div>
      ) : null

    return props.topPhoto ? [Photo, Body] : [Body, Photo]
  }

  onSubmitComment(e) {
    const { dispatch, id } = this.props
    const { comment } = this.state
    const successCb = async res => {
      dispatch(setSuccess())
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
            {this.createCommentButton(props.showDetail)}
          </div>

          {this.props.children}

          {this.createComment(props.showDetail)}

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

export default connect(state => ({
  voteButtonColor: objectPath.get(
    state.site,
    `${PATH_MAP.COLOR}.backgroundColor`
  )
}))(BoxContent)
