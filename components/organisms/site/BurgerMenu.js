import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'
const ReduxBurgerMenu = reduxBurgerMenu(Menu)

const styles = {
  // bmBurgerButton: {
  //   position: 'absolute',
  //   width: '30px',
  //   height: '26px',
  //   left: '25px',
  //   top: '30px'
  // },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    zIndex: 1003
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

class BurgerMenu extends React.Component {
  render() {
    return (
      <ReduxBurgerMenu
        // pageWrapId={'page-wrapss'}
        // outerContainerId={'outer-container'}
        customBurgerIcon={false}
        styles={styles}
      >
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a onClick={this.showSettings} className="">
          Settings
        </a>
      </ReduxBurgerMenu>
    )
  }
}

export default BurgerMenu
