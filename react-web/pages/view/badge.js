import React from 'react'
import Head from 'next/head'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import Slider from 'react-slick'
import IconButton from '@material-ui/core/IconButton'
import { Link, Router } from 'routes'
import Avatar from 'components/atoms/Avatar'
import MypageContents from 'components/templates/edit_view_shared/MypageContents'
import { AppMypage } from 'constants/ActionTypes'
import URL from 'constants/URL'

// TODO
class SimpleSlider extends React.Component {
  render() {
    const { className } = this.props
    var settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <React.Fragment>
        <Slider className={`${className || ''}`} {...settings}>
          <div>
            <div className="row justify-content-center">
              {range(6).map(i => (
                <div key={i} className="badge col-3 py-2">
                  <img src="/static/stub/badges/001.png" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>2</h3>
          </div>
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

        <style jsx>{`
          .row {
            width: 270px;
            margin: 0 auto;
          }

          .badge img {
            width: 52px;
            height: 73px;
            object-fit: cover;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

const iconButtonStyle = {
  position: 'relative',
  left: '3%',
  top: '0px'
}

class Mypage extends React.Component {
  // static async getInitialProps({ ctx }) {
  //   return {}
  // }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <Head>
          <title>Badge</title>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>

        <div className="container">
          <section className="mt-4">
            <IconButton style={iconButtonStyle} onClick={() => Router.back()}>
              <i className="fas fa-chevron-left" />
            </IconButton>
          </section>

          <section className="badges position-relative mt-1">
            <SimpleSlider className="pt-4 mb-4" />
          </section>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Mypage)
