import React from 'react'

import Navbar from 'reactstrap/lib/Navbar'
import NavbarBrand from 'reactstrap/lib/NavbarBrand'
import Nav from 'reactstrap/lib/Nav'
import NavItem from 'reactstrap/lib/NavItem'
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import DropdownMenu from 'reactstrap/lib/DropdownMenu'
import DropdownItem from 'reactstrap/lib/DropdownItem'
import Color from 'constants/Color'

const brandStyle = {
  position: 'relative',
  top: -2
}

const linkItemStyle = {}
const iconSize = 42

export default class Header extends React.Component {
  render() {
    return (
      <div
        className={this.props.className}
        style={{ backgroundColor: Color.MAIN_BLUE }}
      >
        <Navbar dark expand="sm" className="container">
          <NavbarBrand className="mr-5" href="/" style={brandStyle}>
            <img src="/static/img/logo-white.png" width="100" alt="" />
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <div className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-pencil-alt" />
              </div>
            </NavItem>
            <NavItem>
              <div className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-user" />
              </div>
            </NavItem>
            <NavItem>
              <div className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-chart-bar" />
              </div>
            </NavItem>
            <NavItem>
              <div className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-envelope" />
              </div>
            </NavItem>
            <NavItem>
              <div className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-exclamation-circle" />
              </div>
            </NavItem>
            <NavItem>
              <div className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-heart" />
              </div>
            </NavItem>
          </Nav>
          <UncontrolledDropdown className="pl-4">
            <DropdownToggle
              caret
              color="default"
              style={{ backgroundColor: 'white' }}
            >
              <span className="dropdownText pr-4">
                <i className="fas fa-circle" />
                <span>Options</span>
              </span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Navbar>

        <style jsx>{`
          .linkItem {
            color: ${Color.MAIN_BLUE};
            font-size: 24px;
            line-height: ${iconSize}px;
            margin: 0px 13px;
            background-color: white;
            width: ${iconSize}px;
            height: ${iconSize}px;
            text-align: center;
            border-radius: 10px;
          }

          .dropdownText i {
            padding: 0 10px 0 0;
          }
        `}</style>
      </div>
    )
  }
}
