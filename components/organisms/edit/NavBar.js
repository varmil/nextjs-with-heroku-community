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

          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="username"
            />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">
              <i className="fas fa-search" />
            </button>
          </form>
        </Navbar>

        <style jsx>{``}</style>
      </div>
    )
  }
}
