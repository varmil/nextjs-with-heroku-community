import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Color from '../../constants/Color'

const brandStyle = {
  position: 'relative',
  top: -2
}

const linkItemStyle = {
  color: 'white',
  fontSize: 28
}

export default class Example extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: Color.MAIN_BLUE }}>
        <Navbar dark expand="sm" className="container">
          <NavbarBrand className="mr-5" href="/" style={brandStyle}>
            <img src="/static/img/logo-white.png" width="100" alt="" />
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-square-full" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-square-full" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-square-full" />
              </NavLink>
            </NavItem>
          </Nav>
          <UncontrolledDropdown>
            <DropdownToggle caret color="default">
              <span className="pr-4">Options</span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Navbar>

        <style jsx>{``}</style>
      </div>
    )
  }
}
