import React from 'react'
import MultiLineText from 'components/atoms/MultiLineText'

export default class BoxContent extends React.Component {
  render() {
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
            <p className="card-text">
              <MultiLineText>{props.body}</MultiLineText>
            </p>
          </div>

          <div className="mb-3">
            {props.images.map((src, i) => (
              <img
                key={i}
                className="card-img-top"
                src={src}
                alt="Card image cap"
              />
            ))}
          </div>

          <div className="card-footer text-center p-2">
            <span className="mr-3">
              <i className="fas fa-heart" /> {props.like}
            </span>
            <span className="mr-3">
              <i className="fas fa-comment" /> {props.comment}
            </span>
            <span className="">コメントする</span>
          </div>

          <style jsx>{`
            p {
              font-size: 12px;
              color: gray;
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
              font-size: 12px;
              border: none !important;
              background-color: initial !important;
            }
          `}</style>
        </div>
      </div>
    )
  }
}
