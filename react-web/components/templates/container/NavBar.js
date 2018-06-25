import React from 'react'
import { connect } from 'react-redux'
import Navbar from 'reactstrap/lib/Navbar'
import NavbarBrand from 'reactstrap/lib/NavbarBrand'
import { setLogo } from 'actions/site'
import { action as toggleMenu } from 'redux-burger-menu'
import CommunityLogo from 'components/organisms/site/base/CommunityLogo'
import Avatar from 'components/atoms/Avatar'
import NotificationIcon from 'components/atoms/NotificationIcon'
import SettingsIcon from 'components/atoms/SettingsIcon'

const brandStyle = {
  position: 'relative'
  // top: 2
}

class NavBar extends React.Component {
  constructor(props) {
    super(props)

    // this is needed because this class is extended
    this.communityLogo = props.communityLogo || CommunityLogo
    // this.accountIcon = props.accountIcon || AccountIcon
    // this.notificationIcon = props.notificationIcon || NotificationIcon

    this.state = { menuIsOpen: false }
  }

  onSaveLogo(state) {
    this.props.dispatch(setLogo({ ...state }))
  }

  render() {
    const props = this.props
    const common = props.common
    return (
      <React.Fragment>
        <Navbar
          className={`${props.className || ''}`}
          style={{ padding: '1rem 0.8rem', ...props.style }}
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
              {React.createElement(this.communityLogo, {
                src: common.logo.src,
                onSave: state => this.onSaveLogo(state)
              })}
            </div>
          </NavbarBrand>

          <div className="ml-auto icons">
            <i className="fas fa-search mx-1" />
            <NotificationIcon className="mx-1" />
            <SettingsIcon className="mx-1" />
          </div>
        </Navbar>

        <style jsx>{`
          .icons {
            font-size: 20px;
            color: black;
          }

          .icons .icon {
          }

          .searchIcon {
            // position: absolute;
            // top: 30px;
            // right: 30px;
            // font-size: 25px;
          }
          .avatarIcon {
            // position: absolute;
            // top: 30px;
            // left: 30px;
            // font-size: 25px;
            // cursor: pointer;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common
}))(NavBar)
