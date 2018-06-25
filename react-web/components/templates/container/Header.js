import React from 'react'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { setMenuBarStyle } from 'actions/site'

let NavBar, MenuBar

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dynamicImport()
  }

  dynamicImport() {
    if (this.props.edit) {
      NavBar = dynamic(import('components/templates/container/EditableNavBar'))
      MenuBar = dynamic(import('components/organisms/site/edit/MenuBar'))
    } else {
      NavBar = dynamic(import('components/templates/container/NavBar'))
      MenuBar = dynamic(import('components/organisms/site/base/MenuBar'))
    }
  }

  onSaveMenuBar(state) {
    this.props.dispatch(setMenuBarStyle({ ...state }))
  }

  render() {
    const props = this.props
    const common = props.common
    return (
      <React.Fragment>
        <header>
          <NavBar />

          <MenuBar
            onSave={this.onSaveMenuBar.bind(this)}
            style={common.menuBar.style}
          />
        </header>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common
}))(Header)
