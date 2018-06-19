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
  top: 2
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

  onSaveLogo(state) {
    this.props.dispatch(setLogo({ ...state }))
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
          style={{ padding: '1rem', ...props.style }}
        >
          <NavbarBrand className="mx-auto" href="/" style={brandStyle}>
            {React.createElement(this.communityLogo, {
              src: common.logo.src,
              onSave: state => this.onSaveLogo(state)
            })}
          </NavbarBrand>

          <i className="searchIcon fas fa-search" />
        </Navbar>

        <style jsx>{`
          .searchIcon {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 25px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common
}))(NavBar)
