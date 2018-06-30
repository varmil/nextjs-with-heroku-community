import React from 'react'
import { Link } from 'routes'
import MultiLineText from 'components/atoms/MultiLineText'
import AvatarAndName from 'components/molecules/AvatarAndName'

const AVATAR_SIZE = 44

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
          <div className="backIcon col-2 p-0 text-center">
            <i className="fas fa-chevron-left" />
          </div>
          <div className="ava col-auto p-0">
            <AvatarAndName
              size={AVATAR_SIZE}
              name={props.posterName}
              date={props.postDate}
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
            name={props.posterName}
            date={props.postDate}
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
      return props.images.map((src, i) => (
        <img key={i} className="card-img-top" src={src} alt="" />
      ))
    } else {
      return (
        <React.Fragment>
          {props.images.map((src, i) => (
            <Link key={i} route={this.postLink}>
              <img className="card-img-top" src={src} alt="" />
            </Link>
          ))}
        </React.Fragment>
      )
    }
  }

  createComment(isExpanded) {
    const props = this.props
    if (!isExpanded) return null
    return (
      <div className="comments mx-auto pt-2">
        <div className="my-3 text-center" onClick={() => {}}>
          以前のコメントを見る
        </div>
        <div className="commentsPost my-3">
          {props.comments.map((e, i) => <div key={i}>{e.body}</div>)}
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
      </div>
    )
  }

  render() {
    const state = this.state
    const props = this.props
    return (
      <div style={props.style}>
        <div className={`card`}>
          <div className="card-header p-2">
            {this.createHeader(props.showDetail)}
            <span className="date">{props.postDate}</span>
          </div>

          <div className="card-body container py-2 px-5">
            <h5 className="card-title mb-2">{props.title}</h5>
            <div className="card-text">{this.createBody(state.expandBody)}</div>
          </div>

          <div className="mb-3 px-5">{this.createPhoto(props.showDetail)}</div>

          <div className="card-footer text-center p-2">
            <span className="mr-3">
              <i className="fas fa-heart" /> {props.like}
            </span>
            <span className="mr-3">
              <i className="fas fa-comment" /> {props.comment}
            </span>
            <span className="">
              <Link route={`${this.postLink}?focus=true`}>
                <a> コメントする</a>
              </Link>
            </span>
          </div>

          {this.createComment(props.showDetail)}

          <style jsx>{`
            .card-text {
              font-size: 12px;
              color: #505050;
              white-space: normal;
            }

            .media-body span {
              font-size: 10px;
            }

            h5 {
              font-size: 14px;
            }

            h6 {
              font-size: 11px;
            }

            .card {
              border-radius: 0px;
            }

            .card-img-top {
              border-radius: 0;
              height: 110px;
              object-fit: cover;
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
