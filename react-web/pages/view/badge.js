import React from 'react'
import Head from 'next/head'
import map from 'lodash/map'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import Slider from 'react-slick'
import IconButton from '@material-ui/core/IconButton'
import { Link, Router } from 'routes'
import { SimpleSlider } from 'components/molecules/BadgeSlick'
import { AppMypage } from 'constants/ActionTypes'
import URL from 'constants/URL'
import { Badge } from '/../shared/constants/Badge'

const BadgeSlick = props => (
  <div>
    {map(Badge, (v, badgeType) => {
      return (
        <div key={v.imgname} className="row justify-content-center text-center">
          {range(props.fromLevel, props.toLevel + 1).map(level => (
            <div key={v.imgname + level} className="badge col-4 py-2">
              <img src={`/static/img/badge/png/${v.imgname}0${level}.png`} />
            </div>
          ))}
        </div>
      )
    })}

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

const iconButtonStyle = {
  position: 'relative',
  left: '3%',
  top: '0px'
}

class BadgePage extends React.Component {
  // static async getInitialProps({ ctx }) {
  //   return {}
  // }

  render() {
    const props = this.props
    const { badges } = props
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
            <SimpleSlider className="pt-4 mb-4">
              <BadgeSlick fromLevel={1} toLevel={3} />
              <BadgeSlick fromLevel={4} toLevel={6} />
            </SimpleSlider>
          </section>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user,
  badges: state.app.badge.item
}))(BadgePage)
