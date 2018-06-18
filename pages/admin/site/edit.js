import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import AdminHeader from 'components/organisms/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/WhiteBreadcrumb'
import SideBar from 'components/templates/site/container/SideBar'
import TopPage from 'components/templates/site/page/TopPage'
import Device from 'constants/Device'

import { connect } from 'react-redux'
import { loadData } from 'actions/example'

const initialState = {}
const SIDEBAR_WIDTH = 180
const OFFSET_TOP_SIDEBAR = 106
const OFFSET_TOP_MAINBODY = 135

const styles = {
  bmBurgerButton: {
    position: 'absolute',
    width: '30px',
    height: '26px',
    left: '20px',
    top: '20px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'absolute',
    zIndex: 1003
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

class Edit extends React.Component {
  // TODO: this is example code
  // we may have to return site props here, not connect()
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx

    // if (!store.getState().placeholderData) {
    //   store.dispatch(loadData())
    // }

    return { isServer /* site: store.getState().site */ }
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  addDeviceStyle() {
    const base = {
      marginTop: OFFSET_TOP_MAINBODY,
      marginBottom: 20,
      backgroundColor: 'white',
      minHeight: 900,
      boxShadow: '3px 0px 20px black',
      // this is needed for burger menu
      overflow: 'hidden'
    }

    let merged
    switch (this.props.preview.device) {
      case Device.PC:
        merged = {
          marginLeft: SIDEBAR_WIDTH
        }
        break
      case Device.TABLET:
        merged = {
          position: 'absolute',
          left: '50%',
          width: 768,
          marginLeft: -290
        }
        break
      case Device.MOBILE:
        merged = {
          position: 'absolute',
          left: '50%',
          width: 375,
          marginLeft: -66
        }
        break
    }

    return { ...base, ...merged }
  }

  render() {
    const props = this.props
    return (
      <div className="container-fluid">
        <div className="fixed-top">
          <AdminHeader />

          <WhiteBreadcrumb>
            <li className="breadcrumb-item">サイトデザイン</li>
            <li className="breadcrumb-item active">ホーム</li>
          </WhiteBreadcrumb>
        </div>

        <div className="mainBody">
          <SideBar width={SIDEBAR_WIDTH} offsetTop={OFFSET_TOP_SIDEBAR} />

          <div style={this.addDeviceStyle()}>
            <Menu
              // pageWrapId={'page-wrapss'}
              // outerContainerId={'outer-container'}
              // customBurgerIcon={<i className="fas fa-bars" />}
              isOpen={false}
              styles={styles}
            >
              <a id="home" className="menu-item" href="/">
                Home
              </a>
              <a id="about" className="menu-item" href="/about">
                About
              </a>
              <a id="contact" className="menu-item" href="/contact">
                Contact
              </a>
              <a onClick={this.showSettings} className="">
                Settings
              </a>
            </Menu>

            <TopPage {...props} edit={true} />
          </div>
        </div>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          button {
            padding: 10px 150px;
            background: #2b6db2;
          }
        `}</style>
      </div>
    )
  }
}

export default connect(state => ({
  preview: state.site.preview,
  common: state.site.common,
  top: state.site.top
}))(Edit)
