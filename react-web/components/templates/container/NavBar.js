import React from 'react'
import { connect } from 'react-redux'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import Navbar from 'reactstrap/lib/Navbar'
import NavbarBrand from 'reactstrap/lib/NavbarBrand'
import { action as toggleMenu } from 'redux-burger-menu'
import CommunityLogo from 'components/organisms/site/base/CommunityLogo'
import Avatar from 'components/atoms/Avatar'
import NotificationIcon from 'components/atoms/NotificationIcon'
import SettingsIcon from 'components/atoms/SettingsIcon'
import Classes from 'constants/Classes'
import { SiteCommon } from 'constants/ActionTypes'

const brandStyle = {
  position: 'relative'
  // top: 2
}

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menuIsOpen: false }
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <Navbar
          className={`${props.className || ''}`}
          style={{
            padding: '0.6rem 0.8rem 0rem',
            borderBottom: '1px solid black',
            ...props.style
          }}
        >
          <NavbarBrand className="mr-0" style={brandStyle}>
            <div
              className="d-inline-block"
              onClick={() => props.dispatch(toggleMenu(true))}
            >
              <Avatar
                src="https://www.w3schools.com/w3images/avatar2.png"
                className=""
              />
            </div>

            <div className="ml-3 d-inline-block">
              <CommunityLogo
                src={props.logo.src}
                propsPath={`${PATH_MAP.LOGO}`}
              />
            </div>
          </NavbarBrand>

          <div
            className={`ml-auto icons ${Classes.EDITABLE}`}
            data-modal={`ColorModal`}
            data-action={SiteCommon.SET_NAV_ICON_COLOR}
            data-path={`${PATH_MAP.NAV_ICON}`}
          >
            <i className="fas fa-search mx-1 navIcon" />
            <NotificationIcon
              className="mx-1 navIcon"
              color={props.navIcon.color}
            />
            <SettingsIcon
              className="mx-1 navIcon"
              color={props.navIcon.color}
            />
          </div>
        </Navbar>

        <style jsx>{`
          .icons {
            font-size: 20px;
            color: black;
          }

          .icons .icon {
          }

          .navIcon {
            color: ${props.navIcon.color};
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  logo: objectPath.get(state.site, `${PATH_MAP.LOGO}`),
  navIcon: objectPath.get(state.site, `${PATH_MAP.NAV_ICON}`)
}))(NavBar)
