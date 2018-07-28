import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { Router } from 'routes'

/**
 * 一覧用の個別画像
 */
export const PreviewImage = props => {
  const HEIGHT = 110
  return (
    <React.Fragment>
      <div
        onClick={async () => {
          const id = `img${props.index}`
          await Router.pushRoute(`${props.route}#${id}`)
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
PreviewImage.propTypes = {
  index: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

/**
 * 画像一覧。一覧用と詳細表示をshowDetailで切り替える
 */
const Photos = props => {
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
    }
    return result
  }
}
Photos.propTypes = {
  showDetail: PropTypes.bool,
  images: PropTypes.array,
  route: PropTypes.string
}

export default Photos
