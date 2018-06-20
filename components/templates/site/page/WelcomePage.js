import React from 'react'
import range from 'lodash/range'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
  setMenuBarStyle,
  setMainBanner,
  setBoxHeader,
  setSubBanner
} from 'actions/site'
import dynamic from 'next/dynamic'

const initialState = {}
let NavBar, MenuBar, MainBanner, BoxHeader, BoxContent, SubBanner

export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.dynamicImport()
  }

  // NOTE: dynamic import should be done before render(), not render() or constructor()
  dynamicImport() {
    if (this.props.edit) {
      NavBar = dynamic(
        import('components/templates/site/container/EditableNavBar')
      )
      MenuBar = dynamic(import('components/organisms/site/edit/MenuBar'))
      MainBanner = dynamic(import('components/organisms/site/edit/MainBanner'))
      BoxHeader = dynamic(import('components/organisms/site/edit/BoxHeader'))
      BoxContent = dynamic(import('components/organisms/site/base/BoxContent'))
      SubBanner = dynamic(import('components/organisms/site/edit/SubBanner'))
    } else {
      NavBar = dynamic(import('components/templates/site/container/NavBar'))
      MenuBar = dynamic(import('components/organisms/site/base/MenuBar'))
      MainBanner = dynamic(import('components/organisms/site/base/MainBanner'))
      BoxHeader = dynamic(import('components/organisms/site/base/BoxHeader'))
      BoxContent = dynamic(import('components/organisms/site/base/BoxContent'))
      SubBanner = dynamic(import('components/organisms/site/base/SubBanner'))
    }
  }

  /**
   * Edit Handler START
   */
  onSaveMenuBar(state) {
    this.props.dispatch(setMenuBarStyle({ ...state }))
  }

  onSaveBoxHeader(state, index) {
    this.props.dispatch(setBoxHeader({ ...state, index }))
  }

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <main className="main" />

        <style jsx>{`
          .main {
            overflow: hidden;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
