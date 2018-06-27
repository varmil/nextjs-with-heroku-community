import React from 'react'
import objectPath from 'object-path'
import range from 'lodash/range'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { PATH_MAP } from 'reducers/site'
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
      // MenuBar = dynamic(import('components/organisms/site/edit/MenuBar'))
    } else {
      NavBar = dynamic(import('components/templates/container/NavBar'))
      // MenuBar = dynamic(import('components/organisms/site/base/MenuBar'))
    }
  }

  // onSaveMainBanner(state, index) {
  //   this.props.dispatch(setMainBanner({ ...state, index }))
  // }

  // onSaveMenuBar(state) {
  //   this.props.dispatch(setMenuBarStyle({ ...state }))
  // }

  render() {
    const props = this.props
    const mainBanner = props.mainBannerProps

    return (
      <React.Fragment>
        <header>
          <NavBar />

          {range(mainBanner.length).map(i => (
            <props.mainBanner
              key={i}
              className="mb-3"
              contentState={mainBanner[i].contentState}
              src={mainBanner[i].src}
              backgroundColor={mainBanner[i].backgroundColor}
              href={mainBanner[i].href}
              index={i}
              propsPath={`${PATH_MAP.MAIN_BANNER}.${i}`}
              // onSave={state => this.onSaveMainBanner(state, i)}
            />
          ))}
        </header>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  mainBannerProps: objectPath.get(state.site, `${PATH_MAP.MAIN_BANNER}`)
}))(Header)
