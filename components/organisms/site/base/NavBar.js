import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import CommunityLogo from './CommunityLogo'
import AccountIcon from './AccountIcon'
import NotificationIcon from './NotificationIcon'

const brandStyle = {
  position: 'relative',
  top: -2
}

const linkItemStyle = {
  color: 'white',
  fontSize: 28
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)

    // this is needed because this class is extended
    this.communityLogo = props.communityLogo || CommunityLogo
    this.accountIcon = props.accountIcon || AccountIcon
    this.notificationIcon = props.notificationIcon || NotificationIcon
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <Navbar dark expand="sm" className="container">
          <NavbarBrand className="mr-5" href="/" style={brandStyle}>
            {React.createElement(this.communityLogo)}
          </NavbarBrand>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="linkItem" href="#" style={linkItemStyle}>
                {React.createElement(this.accountIcon)}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="linkItem" href="#" style={linkItemStyle}>
                {React.createElement(this.notificationIcon)}
              </NavLink>
            </NavItem>
          </Nav>

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
                placeholder="ユーザー名"
              />
            </div>
          </form>
        </Navbar>
      </div>
    )
  }
}
