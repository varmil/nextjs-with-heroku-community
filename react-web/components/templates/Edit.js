import React from 'react'
import { connect } from 'react-redux'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import SideBar from 'components/templates/container/SideBar'
import Device from 'constants/Device'
// import { loadData } from 'actions/example'

const SIDEBAR_WIDTH = 180
const OFFSET_TOP_SIDEBAR = 106
const OFFSET_TOP_MAINBODY = 135

class Edit extends React.Component {
  // TODO: this is example code
  // we may have to return site props here, not connect()
  // static async getInitialProps(props) {
  // const { store, isServer } = props.ctx
  // if (!store.getState().placeholderData) {
  //   store.dispatch(loadData())
  // }
  // return { isServer /* site: store.getState().site */ }
  // }

  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  componentDidMount() {
    this.setState({ show: true })

    // TODO: get the element rect in iframe
    setTimeout(() => {
      const mb = this.iframe.contentWindow.document.getElementById(
        'TopMainBanner'
      )
      const rect = mb.getBoundingClientRect()
      console.log(rect)
    }, 500)
  }

  addDeviceStyle() {
    const base = {
      marginTop: OFFSET_TOP_MAINBODY,
      marginBottom: 20,
      backgroundColor: 'white',
      minHeight: 667,
      boxShadow: '3px 0px 20px black',
      // this is needed for burger menu
      overflow: 'hidden'
    }

    let merged
    switch (this.props.preview.device) {
      case Device.PC:
        merged = {
          position: 'relative',
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

          {/* <div id="editBody" style={this.addDeviceStyle()}>
            {this.props.children}
          </div> */}

          {this.state.show ? (
            <iframe
              src="/view/home/top"
              style={this.addDeviceStyle()}
              ref={f => {
                this.iframe = f
              }}
            />
          ) : null}
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
