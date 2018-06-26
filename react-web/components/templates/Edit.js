import React from 'react'
// import { connect } from 'react-redux'
// import dynamic from 'next/dynamic'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import OverlayEdit from 'components/organisms/OverlayEdit'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import SideBar from 'components/templates/container/SideBar'
import Device from 'constants/Device'
import Classes from 'constants/Classes'

// env
const IS_SERVER = typeof window === 'undefined'
// side bar
const SIDEBAR_WIDTH = 180
const OFFSET_TOP_SIDEBAR = 106
const OFFSET_TOP_MAINBODY = 135
// device
const MOBILE_WIDTH = 375

export default function ppHOC(WrappedComponent) {
  return class Edit extends React.Component {
    constructor(props) {
      super(props)
      this.state = { show: false, iframeHeight: 0, overlayElements: [] }
      // console.info('EDIT', props)
    }

    componentDidMount() {
      const iWindow = this.iframe.contentWindow
      iWindow.addEventListener('load', () => {
        console.log('iframe height ::', iWindow.document.body.scrollHeight)

        // dynamically create edit overlay elements
        const arr = iWindow.document.getElementsByClassName(Classes.EDITABLE)
        const overlayElements = this.mapEditableElements(arr)

        this.setState({
          ...this.state,
          overlayElements,
          iframeHeight: iWindow.document.body.scrollHeight
        })
      })

      // DEMO: dummy post message to iframe
      // 本来はModal編集でSaveしたタイミングで通知が行く
      setTimeout(() => {
        iWindow.postMessage({ type: 'edited', payload: 'HELLO WORLD' }, '*')
      }, 1500)
    }

    mapEditableElements(elements) {
      const arr = Array.from(elements) // convert to array
      return arr.map((e, i) => {
        //  get the element rect in iframe
        const rect = e.getBoundingClientRect()
        console.log('editable rect ::', rect)
        const tmpStyle = {
          position: 'absolute',
          height: rect.height,
          width: rect.width,
          top: rect.top,
          left: rect.left
        }

        return <OverlayEdit key={i} className="ee" containerStyle={tmpStyle} />
      })
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
            position: 'relative',
            left: '50%',
            width: MOBILE_WIDTH,
            marginLeft: -66
          }
          break
      }

      return { ...base, ...merged }
    }

    // NOTE: only mobile
    addIFrameStyle() {
      return {
        height: this.state.iframeHeight,
        width: MOBILE_WIDTH,
        border: 'none'
      }
    }

    // NOTE: only mobile
    addOverlayContainerStyle() {
      return {
        position: 'absolute',
        height: this.state.iframeHeight,
        width: MOBILE_WIDTH,
        top: 0,
        left: 0
      }
    }

    render() {
      const props = this.props
      const state = this.state
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
              <section style={this.addDeviceStyle()}>
                <iframe
                  ref={f => (this.iframe = f)}
                  style={this.addIFrameStyle()}
                  src="/view/home"
                >
                  {/* <WrappedComponent {...this.props} container={null} /> */}
                </iframe>
                <div
                  id="editableOverlayContainer"
                  style={this.addOverlayContainerStyle()}
                >
                  {state.overlayElements}
                </div>
              </section>
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
