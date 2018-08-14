import React from 'react'
import Slider from 'react-slick'
import { Badge } from '/../shared/constants/Badge'

export default props => (
  <div>
    <div className="row justify-content-center">
      {props.chunk.map((e, i) => (
        <div key={0 + i} className="badge col-3 py-2 px-0">
          <img
            src={`/static/img/badge/png/${Badge[e.badgeType].imgname}0${
              e.level
            }.png`}
          />
        </div>
      ))}
    </div>

    <style jsx>{`
      .row {
        width: 80%;
        margin: 0 auto;
      }

      .badge img {
        width: 100%;
        object-fit: cover;
      }
    `}</style>
  </div>
)

export class SimpleSlider extends React.Component {
  render() {
    const { className, children } = this.props

    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    // TODO レベル高い順に表示とか
    return (
      <React.Fragment>
        <Slider className={`${className || ''}`} {...settings}>
          {children}
        </Slider>

        <style global jsx>{`
          .slick-slider {
            overflow: hidden !important;
          }

          .slick-dots {
            top: -5px;
            bottom: initial !important;
          }

          .slick-dots li {
            margin: 0 !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
