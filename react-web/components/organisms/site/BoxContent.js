import React from 'react'
import { Link, Router } from 'routes'
import MultiLineText from 'components/atoms/MultiLineText'
import Avatar from 'components/atoms/Avatar'
import AvatarAndName from 'components/molecules/AvatarAndName'

const AVATAR_SIZE = 44
// アンカーで飛んだときになんとなく真ん中あたりに表示するため
const OFFSET_IMG_TOP = -100

const PreviewImage = props => (
  <React.Fragment>
    <div
      onClick={async () => {
        const id = `img${props.index}`
        await Router.pushRoute(`${props.route}#${id}`)
        const top = document.getElementById(id).offsetTop
        window.scrollTo(0, top + OFFSET_IMG_TOP)
      }}
    >
      <img className="card-img-top" src={props.src} alt="" />
    </div>
    <style jsx>{`
      img {
        border-radius: 0;
        object-fit: cover;
        height: 110px;
      }
    `}</style>
  </React.Fragment>
)

export default class BoxContent extends React.Component {
  state = {
    expandBody: this.props.expandBody
  }

  constructor(props) {
    super(props)
    this.commentInput = React.createRef()
    this.postLink = `/view/post/${props.boxType}/${props.postId}`
  }

  componentDidMount() {
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
            <AvatarAndName size={AVATAR_SIZE} name={props.posterName} />
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
          <AvatarAndName size={AVATAR_SIZE} name={props.posterName} />
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

  createVote() {
    const props = this.props
    if (!props.vote) return null
    return (
      <div className="wrap py-2 px-5 mt-2 mb-3">
        <div className="mb-2">
          <span>ただいまの投票数</span>
          <span className="voteNum ml-2">821</span>
        </div>
        <button type="button" className="btn">
          投票する
        </button>

        <style jsx>{`
          span {
            font-size: 12px;
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

          button {
            font-size: 12px;
            width: 120px;
            border-radius: 30px;
            color: white;
            background-color: ${props.voteButtonColor};
          }
        `}</style>
      </div>
    )
  }

  createCommentButton(showDetail) {
    let onClick = null
    if (showDetail) {
      onClick = () => {
        window.scrollTo(0, 9999)
        this.commentInput.focus()
      }
    } else {
      onClick = async () => {
        await Router.pushRoute(`${this.postLink}?focus=true`)
      }
    }
    return (
      <span onClick={onClick}>
        <a>コメントする</a>
      </span>
    )
  }

  createComment(isExpanded) {
    const props = this.props
    if (!isExpanded) return null
    return (
      <div className="comments mx-auto pt-2">
        <div className="load my-3 text-center" onClick={() => {}}>
          以前のコメントを見る
        </div>
        <div className="commentsPost my-3 px-5">
          {props.comments.map((e, i) => (
            <div key={i} className="row my-3">
              <Avatar src={e.commenterIcon} />
              <div className="col body">
                <Link route={this.postLink}>
                  <a>{e.commenterName}</a>
                </Link>
                <div>{e.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="commentForm">
          <input
            type="text"
            ref={input => {
              this.commentInput = input
            }}
            className="form-control"
            placeholder="コメントする..."
          />
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
            margin-left: 8px;
          }
        `}</style>
      </div>
    )
  }

  createMainContent() {
    const state = this.state
    const props = this.props
    const Body = (
      <div className="card-body container py-2 px-5">
        <h5 className="card-title mb-2">{props.title}</h5>
        <div className="card-text">{this.createBody(state.expandBody)}</div>

        <style jsx>{`
          .card-text {
            font-size: 12px;
            color: #505050;
            white-space: normal;
          }

          h5 {
            font-size: 14px;
          }
        `}</style>
      </div>
    )

    const Photo =
      props.images && props.images.length > 0 ? (
        <div className="mb-3 px-5">{this.createPhoto(props.showDetail)}</div>
      ) : null

    return props.topPhoto ? [Photo, Body] : [Body, Photo]
  }

  render() {
    const props = this.props
    return (
      <div style={props.style}>
        <div className={`card`}>
          <div className="card-header p-2">
            {this.createHeader(props.showDetail)}
            <span className="date">{props.postDate}</span>
          </div>

          <div className="">{this.createMainContent()}</div>

          {this.createVote()}

          <div className="card-footer text-center p-2">
            <span className="mr-3">
              <i className="fas fa-heart" /> {props.like}
            </span>
            <span className="mr-3">
              <i className="fas fa-comment" /> {props.comment}
            </span>
            {this.createCommentButton(props.showDetail)}
          </div>

          {this.createComment(props.showDetail)}

          <style jsx>{`
            .media-body span {
              font-size: 10px;
            }

            .card {
              border-radius: 0px;
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
              font-size: 14px;
              border: none !important;
              background-color: initial !important;
            }
          `}</style>
        </div>
      </div>
    )
  }
}
