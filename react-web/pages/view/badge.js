import React from 'react'
import Head from 'next/head'
import find from 'lodash/find'
import map from 'lodash/map'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { Portal } from 'react-portal'
import { createAction } from 'redux-actions'
import Modal from 'reactstrap/lib/Modal'
import ModalBody from 'reactstrap/lib/ModalBody'
import IconButton from '@material-ui/core/IconButton'
import { Link, Router } from 'routes'
import { SimpleSlider } from 'components/molecules/BadgeSlick'
import { AppBadge } from 'constants/ActionTypes'
import URL from 'constants/URL'
import { Badge } from '/../shared/constants/Badge'

class BadgeSlide extends React.Component {
  state = {
    modalIsOpen: false,
    modalImage: '',
    modalBadge: null
  }

  toggle = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen })
  }

  render() {
    const props = this.props
    return (
      <div>
        {map(Badge, (v, badgeType) => {
          const myBadgeStatus = find(props.badges, { badgeType: +badgeType })
          return (
            <div
              key={v.imgname}
              className="row justify-content-center text-center"
            >
              {range(props.fromLevel, props.toLevel + 1).map(level => {
                const myLevel = myBadgeStatus ? myBadgeStatus.level : 0
                // 次のレベルは影表示
                const shadow = level === myLevel + 1 ? 'shadow-' : ''
                // 2つ以上上のレベルははてな
                const imgSrc =
                  level > myLevel + 1
                    ? 'hatena.png'
                    : `${v.imgname}${shadow}0${level}.png`

                return (
                  <div
                    key={v.imgname + level}
                    className="badge col-4 py-2"
                    onClick={() =>
                      this.setState({
                        modalIsOpen: true,
                        modalImage: `/static/img/badge/png/${imgSrc}`,
                        modalBadge: v.desc
                      })
                    }
                  >
                    <img src={`/static/img/badge/png/${imgSrc}`} />
                  </div>
                )
              })}
            </div>
          )
        })}

        <Portal>
          <Modal
            isOpen={this.state.modalIsOpen}
            toggle={this.toggle}
            centered={true}
          >
            <ModalBody>
              <div className="w-50 mx-auto">
                <img className="w-100" src={this.state.modalImage} />
              </div>
              <div className="text-center">
                {this.state.modalBadge} で取得可能！
              </div>
            </ModalBody>
          </Modal>
        </Portal>

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
  }
}

const iconButtonStyle = {
  position: 'relative',
  left: '3%',
  top: '0px'
}

class BadgePage extends React.Component {
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    dispatch(createAction(AppBadge.FETCH_LIST_REQUEST)())
    return {}
  }

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
              <BadgeSlide badges={badges} fromLevel={1} toLevel={3} />
              <BadgeSlide badges={badges} fromLevel={4} toLevel={6} />
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
