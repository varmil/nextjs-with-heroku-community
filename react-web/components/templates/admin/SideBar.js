import React from 'react'
// import { Link } from 'routes'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { setDevice } from 'actions/site'
import ActiveLink from 'components/atoms/ActiveLink'
import URL from 'constants/URL'
import Color from 'constants/Color'
// import Device from 'constants/Device'

// editor size controller
// const SideBarDevice = props => {
//   let iconString
//   switch (props.type) {
//     case Device.PC:
//       // iconString = 'fa-desktop'
//       break
//     case Device.TABLET:
//       iconString = 'fa-tablet-alt'
//       break
//     case Device.MOBILE:
//       iconString = 'fa-mobile-alt'
//       break
//   }
//
//   const selectedClass = props.selected ? 'selected' : ''
//
//   return (
//     <li onClick={() => props.onClick(props.type)}>
//       <a className={`${selectedClass}`} href="javascript:void(0);">
//         <i className={`fas ${iconString}`} />
//       </a>
//
//       <style jsx>{`
//         li {
//           display: block;
//           float: left;
//           width: 33.3333%;
//           height: 60px;
//         }
//
//         a:hover,
//         a.selected {
//           color: #fff;
//           background-color: ${Color.PERA_BLUE};
//         }
//
//         a {
//           display: block;
//           height: 100%;
//           text-align: center;
//         }
//
//         .fa,
//         .far,
//         .fas {
//           font-size: 30px;
//           line-height: 60px;
//         }
//       `}</style>
//     </li>
//   )
// }

// page item
const PageItem = props => {
  return (
    <React.Fragment>
      <ActiveLink route={`${URL.ADMIN_SITE_EDIT}/${props.slug}`}>
        <div className={`pageItem hierarchy${props.level}`}>{props.text}</div>
      </ActiveLink>

      <style jsx>{`
        .pageItem {
          cursor: pointer;
        }

        .pageItem.active {
          background-color: ${Color.PERA_BLUE};
        }

        .hierarchy1 {
          text-indent: 10%;
        }

        .hierarchy2 {
          text-indent: 20%;
        }
      `}</style>
    </React.Fragment>
  )
}

class SideBar extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  isSelectedDevice(type) {
    return type === this.props.preview.device
  }

  onClickDevice(type) {
    this.props.dispatch(setDevice({ device: type }))
  }

  createPageHierarchy() {
    return this.props.boxes.map((box, i) => (
      <React.Fragment key={i}>
        <PageItem
          level={2}
          slug={`${URL.BOX_BASE_SLUG}/${box.slug}`}
          text={box.header.text}
        />
      </React.Fragment>
    ))
  }

  render() {
    const props = this.props
    return (
      <nav className="bg-faded sidebar" style={{ width: props.width }}>
        <ul className="sidebarActions">
          <li>
            <ActiveLink route={`${URL.ADMIN_SITE_EDIT}/home?previewMode=true`}>
              <a>
                <i className="fas fa-shoe-prints" />プレビュー
              </a>
            </ActiveLink>
          </li>
          <li>
            <a href="javascript:void(0);" onClick={props.onClickFontChange}>
              <i className="fas fa-font" />フォント変更
            </a>
          </li>
        </ul>

        {/* <ul className="sidebarUndoRedo">
          <li title="⌘+z">
            <a className="undo_btn grayout" href="javascript:void(0);">
              <i className="fas fa-undo" />
              操作を<br />1つ戻す
            </a>
          </li>
          <li title="⌘+shift+z">
            <a className="redo_btn grayout" href="javascript:void(0);">
              <i className="fas fa-redo" />
              操作を<br />1つ進める
            </a>
          </li>
        </ul> */}

        {/* <ul id="editor-size-controller" className="sidebarDevice">
          <SideBarDevice
            selected={this.isSelectedDevice(Device.PC)}
            type={Device.PC}
            onClick={this.onClickDevice.bind(this)}
          />
          <SideBarDevice
            selected={this.isSelectedDevice(Device.TABLET)}
            type={Device.TABLET}
            onClick={this.onClickDevice.bind(this)}
          />
          <SideBarDevice
            selected={this.isSelectedDevice(Device.MOBILE)}
            type={Device.MOBILE}
            onClick={this.onClickDevice.bind(this)}
          />
        </ul> */}

        {/* <section>
          <ToggleSideSecond
            icon="fa-clipboard-list"
            text="テーマカラー変更"
            selected={false}
          />
        </section> */}

        <section className="hierarchy mt-3">
          <div className="my-2">
            <PageItem level={1} slug={'welcome'} text={'Welcomeページ'} />
          </div>
          <div className="my-2">
            <PageItem level={1} slug={'home'} text={'トップページ'} />
            {this.createPageHierarchy()}
          </div>
        </section>

        <style global jsx>{`
          .sidebar {
            color: #fff !important;
          }

          .sidebar a {
            color: #fff !important;
            transition: background 0.12s ease-in;
          }

          a {
            margin: 0;
            padding: 0;
            font-size: 100%;
            vertical-align: baseline;
            background: transparent;
          }

          a:link,
          a:visited {
            text-decoration: none !important;
          }
        `}</style>

        <style jsx>{`
          .sidebar {
            position: fixed;
            top: ${props.offsetTop}px;
            bottom: 0;
            left: 0;
            z-index: 1000;
            padding: 0px;
            overflow-x: auto;
            overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
          }

          .bg-faded {
            background-color: #05161a;
          }
        `}</style>

        {/* peraichi flat4 */}
        <style jsx>{`
          .sidebar ul {
            padding-left: 0;
          }

          ul,
          li {
            list-style-type: none;
          }

          .sidebarActions li:nth-child(odd) {
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }

          .sidebarActions li {
            display: block;
            width: 100%;
            margin: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            font-size: 11px;
          }

          .sidebarActions li a {
            display: block;
            height: 90px;
            padding-top: 29px;
          }

          .sidebarActions li a:hover,
          .sidebarActions li a.active {
            background-color: ${Color.PERA_BLUE};
            border-color: ${Color.PERA_BLUE};
            color: #fff;
          }

          .sidebarActions .fa,
          .sidebarActions .far,
          .sidebarActions .fas {
            position: relative;
            display: block;
            margin-bottom: 11px;
            font-size: 24px;
            line-height: 1;
          }
          /* peraichi end */
        `}</style>

        {/* UndoRedo */}
        {/* <style jsx>{`
          .sidebarUndoRedo {
            overflow: hidden;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .sidebarUndoRedo li {
            position: relative;
            display: block;
            float: left;
            width: 50%;
            line-height: 1.3;
            font-size: 12px;
          }

          .sidebarUndoRedo a.grayout,
          .sidebarUndoRedo a:link.grayout,
          .sidebarUndoRedo a:hover.grayout {
            color: gray;
            background-color: #072127;
            cursor: default;
          }

          .sidebarUndoRedo li:first-child a {
            padding-left: 20px;
          }

          .sidebarUndoRedo li:first-child a i {
            position: absolute;
            top: 20px;
            left: 3px;
          }

          .sidebarUndoRedo li:nth-child(2) a i {
            position: absolute;
            top: 20px;
            right: 8px;
          }

          .sidebarUndoRedo a {
            display: block;
            padding: 12px 0;
            background-repeat: no-repeat;
          }
        `}</style> */}

        {/* Editor size controller */}
        {/* <style jsx>{`
          .sidebarDevice {
            position: relative;
            top: -1px;
            overflow: hidden;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}</style> */}

        {/* page link */}
        <style jsx>{`
          .hierarchy {
            font-size: 13px;
          }
        `}</style>
      </nav>
    )
  }
}

// IMPORTANT: connect --> withRouter しないと、URLが変わってもre-renderしないので注意！
const Reduxed = connect(state => ({
  preview: state.site.preview,
  boxes: objectPath.get(state.site, `${PATH_MAP.BOXES}.item`)
}))(SideBar)
export default withRouter(Reduxed)
