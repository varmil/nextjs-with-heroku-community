import React from 'react'
import { connect } from 'react-redux'
import BurgerMenu from 'components/organisms/site/BurgerMenu'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { setLogo, setNotificationIcon, setAccountIcon } from 'actions/site'
import CommunityLogo from 'components/organisms/site/base/CommunityLogo'
import AccountIcon from 'components/organisms/site/base/AccountIcon'
import NotificationIcon from 'components/organisms/site/base/NotificationIcon'

const brandStyle = {
  position: 'relative',
  top: -2
}

const linkItemStyle = {
  color: 'white',
  fontSize: 28
}

class NavBar extends React.Component {
  constructor(props) {
    super(props)

    // this is needed because this class is extended
    this.communityLogo = props.communityLogo || CommunityLogo
    this.accountIcon = props.accountIcon || AccountIcon
    this.notificationIcon = props.notificationIcon || NotificationIcon
  }

  onClickLogoModalImage(src) {
    this.props.dispatch(setLogo({ src }))
  }

  onChangeNotfIconColor(color, index) {
    this.props.dispatch(setNotificationIcon({ color }))
  }

  onChangeAccIconColor(color, index) {
    this.props.dispatch(setAccountIcon({ color }))
  }

  render() {
    const props = this.props
    const common = props.common
    return (
      <React.Fragment>
        <BurgerMenu />
        <Navbar
          dark
          className={`container ${props.className}`}
          style={props.style}
        >
          <NavbarBrand className="mr-5" href="/" style={brandStyle}>
            {React.createElement(this.communityLogo, {
              src: common.logo.src,
              onClickModalImage: src => this.onClickLogoModalImage(src)
            })}
          </NavbarBrand>

          {/* <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="linkItem" href="#" style={linkItemStyle}>
              {React.createElement(this.notificationIcon, {
                color: common.notificationIcon.color,
                onChangeColor: this.onChangeNotfIconColor.bind(this)
              })}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="linkItem" href="#" style={linkItemStyle}>
              {React.createElement(this.accountIcon, {
                color: common.accountIcon.color,
                onChangeColor: this.onChangeAccIconColor.bind(this)
              })}
            </NavLink>
          </NavItem>
        </Nav> */}

          <form className="form-inline my-2 pl-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-search" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="キーワード"
              />
            </div>
          </form>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common
}))(NavBar)
