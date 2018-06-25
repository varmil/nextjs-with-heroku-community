import React from 'react'
import range from 'lodash/range'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { setMainBanner, setBoxHeader, setSubBanner } from 'actions/site'

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

  onSaveMainBanner(state, index) {
    this.props.dispatch(setMainBanner({ ...state, index }))
  }

  // onSaveMenuBar(state) {
  //   this.props.dispatch(setMenuBarStyle({ ...state }))
  // }

  render() {
    const props = this.props
    // const common = props.common
    const mainBanner = props.top.mainBanner

    return (
      <React.Fragment>
        <header>
          <NavBar />

          {range(mainBanner.item.length).map(i => (
            <props.mainBanner
              key={i}
              className="mb-3"
              contentState={mainBanner.item[i].contentState}
              src={mainBanner.item[i].src}
              backgroundColor={mainBanner.item[i].backgroundColor}
              href={mainBanner.item[i].href}
              onSave={state => this.onSaveMainBanner(state, i)}
            />
          ))}
        </header>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  top: state.site.top
}))(Header)
