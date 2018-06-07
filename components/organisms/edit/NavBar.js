import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const brandStyle = {
  position: 'relative',
  top: -2
}

const linkItemStyle = {
  color: 'white',
  fontSize: 28
}

export default class NavBar extends React.Component {
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <Navbar dark expand="sm" className="container">
          <NavbarBrand className="mr-5" href="/" style={brandStyle}>
            <img src="/static/img/logo-blue.png" width="100" alt="" />
          </NavbarBrand>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-bell text-primary" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-user text-primary" />
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

        <style jsx>{``}</style>
      </div>
    )
  }
}
