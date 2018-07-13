import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import Navbar from 'reactstrap/lib/Navbar'
import NavbarBrand from 'reactstrap/lib/NavbarBrand'
import Nav from 'reactstrap/lib/Nav'
import NavItem from 'reactstrap/lib/NavItem'
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import DropdownMenu from 'reactstrap/lib/DropdownMenu'
import DropdownItem from 'reactstrap/lib/DropdownItem'
import Avatar from 'components/atoms/Avatar'
import Color from 'constants/Color'

const brandStyle = {
  position: 'relative',
  top: -2
}

const linkItemStyle = {}
const iconSize = 42

class AdminHeader extends React.Component {
  render() {
    const props = this.props
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
              <Link route={'/admin/post/list'}>
                <div className="linkItem" style={linkItemStyle}>
                  <i className="fas fa-pen" />
                </div>
              </Link>
            </NavItem>
            <NavItem>
              <Link route={'/admin/fan/list'}>
                <div className="linkItem" style={linkItemStyle}>
                  <i className="fas fa-users" />
                </div>
              </Link>
            </NavItem>
            <NavItem>
              <div className="linkItem" style={linkItemStyle}>
                <i className="fas fa-chart-bar" />
              </div>
            </NavItem>
            <NavItem>
              <Link route={'/admin/site/edit/welcome'}>
                <div className="linkItem" style={linkItemStyle}>
                  <i className="fas fa-brush" />
                </div>
              </Link>
            </NavItem>
            <NavItem>
              <div className="linkItem" style={linkItemStyle}>
                <i className="fas fa-envelope" />
              </div>
            </NavItem>
            {/* <NavItem>
              <div className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-exclamation-circle" />
              </div>
            </NavItem> */}
            {/* <NavItem>
              <div className="linkItem" href="#" style={linkItemStyle}>
                <i className="fas fa-heart" />
              </div>
            </NavItem> */}
          </Nav>
          <UncontrolledDropdown className="pl-4">
            <DropdownToggle
              caret
              color="default"
              style={{ backgroundColor: 'white' }}
            >
              <span className="dropdownText pr-4">
                <Avatar src={props.user.iconPath} size={36} className="mr-3" />
                <span>{props.user.brand.name}</span>
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
            cursor: pointer;
          }

          .dropdownText span {
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(AdminHeader)
