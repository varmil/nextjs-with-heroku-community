import React from 'react'

export default class BoxHeader extends React.Component {
  render() {
    const props = this.props
    return (
      <div className={props.className} style={props.style}>
        <div className={`card rounded-0`}>
          <img
            className="card-img-top"
            src="https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png"
            alt="Card image cap"
          />

          <div className="card-header p-2">
            <div className="media">
              <img
                className="mr-3"
                src="http://propeller.in/components/list/img/40x40.png"
                width="40"
                height="40"
                alt="Generic placeholder image"
              />
              <div className="media-body">
                <h6 className="m-0">Commune スタッフ</h6>
                <span>2018/06/01</span>
              </div>
            </div>
          </div>

          <div className="card-body p-2">
            <h5 className="card-title mb-1">{props.title || 'Template'}</h5>
            <p className="card-text">
              おはようございます。今日もいい天気ですね。本日は...
            </p>
          </div>

          <div className="card-footer p-2">
            <span className="mr-3">
              <i className="far fa-heart" /> 100
            </span>
            <span>
              <i className="far fa-comment" /> 67
            </span>
          </div>

          <style jsx>{`
            p {
              font-size: 12px;
              color: gray;
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
              font-size: 11px;
            }
          `}</style>
        </div>
      </div>
    )
  }
}
