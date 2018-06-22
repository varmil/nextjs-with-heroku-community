import React from 'react'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { setMenuBarStyle } from 'actions/site'
import BurgerMenu from 'components/organisms/site/BurgerMenu'

let NavBar, MenuBar

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dynamicImport()
  }

  dynamicImport() {
    if (this.props.edit) {
      NavBar = dynamic(
        import('components/templates/site/container/EditableNavBar')
      )
      MenuBar = dynamic(import('components/organisms/site/edit/MenuBar'))
    } else {
      NavBar = dynamic(import('components/templates/site/container/NavBar'))
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
          {(() => {
            // dont use side menu because this cannot be hidden
            return props.edit ? null : <BurgerMenu />
          })()}

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
