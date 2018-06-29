import React from 'react'
import { Link } from 'routes'
import MultiLineText from 'components/atoms/MultiLineText'

export default class BoxContent extends React.Component {
  state = {
    expandBody: this.props.expandBody
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
            <Link key={i} route={`/view/post/${props.boxType}/${props.postId}`}>
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
        <span className="my-3">以前のコメントを見る</span>
        <div className="commentsPost my-3">
          {props.comments.map((e, i) => <div key={i}>{e.body}</div>)}
        </div>
        <div className="commentForm">
          <input
            type="text"
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
            <div className="media">
              <img
                className="mr-3"
                src={props.posterIcon}
                width="40"
                height="40"
                alt="Generic placeholder image"
              />
              <div className="media-body">
                <h5 className="m-0">{props.posterName}</h5>
                <span>{props.postDate}</span>
              </div>
            </div>
          </div>

          <div className="card-body p-2">
            <h5 className="card-title mb-2">{props.title}</h5>
            <div className="card-text">{this.createBody(state.expandBody)}</div>
          </div>

          <div className="mb-3">{this.createPhoto(props.expandPhoto)}</div>

          <div className="card-footer text-center p-2">
            <span className="mr-3">
              <i className="fas fa-heart" /> {props.like}
            </span>
            <span className="mr-3">
              <i className="fas fa-comment" /> {props.comment}
            </span>
            <span className="">コメントする</span>
          </div>

          {this.createComment(props.expandComment)}

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
