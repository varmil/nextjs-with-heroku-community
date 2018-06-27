import React from 'react'
// import { connect } from 'react-redux'
// import dynamic from 'next/dynamic'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import OverlayEditWithModal from 'components/organisms/OverlayEditWithModal'
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
      // console.info('EDIT', props)
      this.state = { show: false, iframeHeight: 0, overlayElements: [] }
    }

    componentDidMount() {
      const iWindow = this.iframe.contentWindow

      // iframe内を走査して、親側（Overlay側）に更新をかける
      const updateOverlays = () => {
        // dynamically create edit overlay elements
        const arr = iWindow.document.getElementsByClassName(Classes.EDITABLE)
        const overlayElements = this.mapEditableElements(arr, iWindow)

        this.setState({
          ...this.state,
          overlayElements,
          iframeHeight: iWindow.document.body.scrollHeight
        })
      }

      iWindow.addEventListener('load', () => {
        updateOverlays()

        // 定期的にiframe内を監視して高さが変化していたらOverlayにも反映
        // ちょっと手抜き。本当はEventでやりとりすべき
        this.timer = setInterval(() => {
          const frameHeight = iWindow.document.body.scrollHeight
          if (this.state.iframeHeight === frameHeight) return
          console.info('iframe height changed, so we re-render overlay')
          console.info('height ::', frameHeight)
          updateOverlays()
        }, 500)
      })

      // iWindow.postMessage({ type: IFrame.EVENT_TYPE_LOAD, payload: {} }, '*')
    }

    componentWillUnmount() {
      console.log('clear timer', this.timer)
      clearInterval(this.timer)
    }

    // map from elements in iframe to react component
    mapEditableElements(elements, iWindow) {
      const arr = Array.from(elements) // convert to array
      return arr.map((e, i) => {
        // FIXME: 高さが変化した場合ここと、iframeHeightが追随する必要あり
        const rect = e.getBoundingClientRect()
        const attr = e.dataset
        return (
          <OverlayEditWithModal
            key={i}
            rect={rect}
            attr={attr}
            iWindow={iWindow}
            dispatch={this.props.dispatch}
          />
        )
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
                  src={'/view/home'}
                />
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
