import React from 'react'
// import { connect } from 'react-redux'
// import dynamic from 'next/dynamic'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import SideBar from 'components/templates/container/SideBar'
import Device from 'constants/Device'
import Classes from 'constants/Classes'

// import { loadData } from 'actions/example'
const IS_SERVER = typeof window === 'undefined'
const SIDEBAR_WIDTH = 180
const OFFSET_TOP_SIDEBAR = 106
const OFFSET_TOP_MAINBODY = 135

export default function ppHOC(WrappedComponent) {
  return class Edit extends React.Component {
    constructor(props) {
      super(props)
      this.state = { show: false }

      console.info('EDIT', props)
    }

    componentDidMount() {
      // this.setState({ show: true })
      // this.Frame = dynamic(import('react-frame-component'))

      // TODO: get the element rect in iframe
      const iWindow = this.iframe.contentWindow
      iWindow.addEventListener('load', () => {
        const mb = iWindow.document.getElementsByClassName(Classes.EDITABLE)
        const rect = mb[0].getBoundingClientRect()
        console.log('editable', rect)
      })

      // dummy post message to iframe
      // 本来はModal編集でSaveしたタイミングで通知が行く
      setTimeout(() => {
        iWindow.postMessage('HELLO WORLD', '*')
      }, 1500)
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

            {!IS_SERVER ? (
              <iframe
                ref={f => (this.iframe = f)}
                style={this.addDeviceStyle()}
                src="/view/home"
              >
                {/* <WrappedComponent {...this.props} container={null} /> */}
              </iframe>
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
}

// export default connect(state => ({
//   preview: state.site.preview,
//   common: state.site.common,
//   top: state.site.top
// }))(Edit)
