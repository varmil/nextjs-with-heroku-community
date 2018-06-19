import React from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand } from 'reactstrap'
import { setLogo } from 'actions/site'
import { action as toggleMenu } from 'redux-burger-menu'
import CommunityLogo from 'components/organisms/site/base/CommunityLogo'
// import AccountIcon from 'components/organisms/site/base/AccountIcon'
// import NotificationIcon from 'components/organisms/site/base/NotificationIcon'

const brandStyle = {
  position: 'relative',
  top: 2
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
          dark
          className={`container ${props.className}`}
          style={{ padding: '1rem', ...props.style }}
        >
          <div onClick={() => props.dispatch(toggleMenu(true))}>
            <i className="menuIcon fas fa-bars" />
          </div>

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
          .menuIcon {
            position: absolute;
            top: 30px;
            left: 30px;
            font-size: 25px;
            cursor: pointer;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common
}))(NavBar)
