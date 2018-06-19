import React from 'react'
import range from 'lodash/range'
// import dynamic from 'next/dynamic'
import {
  setMenuBarStyle,
  setMenuBarItem,
  setMainBanner,
  setBoxHeader,
  setSubBanner,
  setFooter
} from 'actions/site'

import NavBar from 'components/templates/site/container/EditableNavBar'
import MenuBar from 'components/organisms/site/edit/MenuBar'
import MainBanner from 'components/organisms/site/edit/MainBanner'
import BoxHeader from 'components/organisms/site/edit/BoxHeader'
import BoxContent from 'components/organisms/site/edit/BoxContent'
import SubBanner from 'components/organisms/site/edit/SubBanner'
// import Footer from 'components/organisms/site/edit/Footer'

const initialState = {}
// let NavBar, MenuBar, MainBanner, BoxHeader, BoxContent, SubBanner, Footer

export default class TopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  // NOTE: dynamic import should be done before render(), not render() or constructor()
  // dynamicImport() {
  //   if (this.props.edit) {
  //     NavBar = dynamic(import('components/organisms/site/edit/NavBar'))
  //     MenuBar = dynamic(import('components/organisms/site/edit/MenuBar'))
  //     MainBanner = dynamic(import('components/organisms/site/edit/MainBanner'))
  //     BoxHeader = dynamic(import('components/organisms/site/edit/BoxHeader'))
  //     BoxContent = dynamic(import('components/organisms/site/edit/BoxContent'))
  //     SubBanner = dynamic(import('components/organisms/site/edit/SubBanner'))
  //     Footer = dynamic(import('components/organisms/site/edit/Footer'))
  //   } else {
  //     NavBar = dynamic(import('components/organisms/site/base/NavBar'))
  //     MenuBar = dynamic(import('components/organisms/site/base/MenuBar'))
  //     MainBanner = dynamic(import('components/organisms/site/base/MainBanner'))
  //     BoxHeader = dynamic(import('components/organisms/site/base/BoxHeader'))
  //     BoxContent = dynamic(import('components/organisms/site/base/BoxContent'))
  //     SubBanner = dynamic(import('components/organisms/site/base/SubBanner'))
  //     Footer = dynamic(import('components/organisms/site/base/Footer'))
  //   }
  // }

  componentWillMount() {
    // this.dynamicImport()
  }

  createBoxContents() {
    return (
      <div className="container mt-2 mb-5">
        <div className="row justify-content-center px-3">
          <BoxContent className="col-12 p-1" />
          <BoxContent className="col-12 p-1" />
          <BoxContent className="col-12 p-1" />
          <BoxContent className="col-12 p-1" />
        </div>
      </div>
    )
  }

  createSubBanners() {
    const subBanner = this.props.top.subBanner
    return (
      <div className="container">
        <div className="row justify-content-center px-3">
          {range(subBanner.item.length).map(i => (
            <SubBanner
              key={i}
              className="col-6 py-3"
              src={subBanner.item[i].src}
              href={subBanner.item[i].href}
              onClickModalImage={src => this.onClickSBModalImage(src, i)}
            />
          ))}
        </div>
      </div>
    )
  }

  /**
   * Edit Handler START
   */
  onSaveMenuBar(state) {
    this.props.dispatch(setMenuBarStyle(state.style))
    this.props.dispatch(setMenuBarItem(state.item))
  }

  onSaveBoxHeader(state, index) {
    this.props.dispatch(setBoxHeader({ ...state, index }))
  }

  // Main Banner
  onSaveMainBanner(state, index) {
    this.props.dispatch(setMainBanner({ ...state, index }))
  }

  // Sub Banner
  onClickSBModalImage(src, index) {
    this.props.dispatch(setSubBanner({ src, index }))
  }

  onSaveFooter(state) {
    this.props.dispatch(setFooter(state))
  }
  /**
   * Edit Handler END
   */

  render() {
    const props = this.props
    const mainBanner = props.top.mainBanner

    return (
      <React.Fragment>
        <header>
          <NavBar />
          <MenuBar
            onSave={this.onSaveMenuBar.bind(this)}
            style={props.common.menuBar.style}
            item={props.common.menuBar.item}
          />

          {range(mainBanner.item.length).map(i => (
            <MainBanner
              key={i}
              className="mb-5"
              contentState={mainBanner.item[i].contentState}
              src={mainBanner.item[i].src}
              backgroundColor={mainBanner.item[i].backgroundColor}
              href={mainBanner.item[i].href}
              onSave={state => this.onSaveMainBanner(state, i)}
            />
          ))}
        </header>

        <main className="">
          <div className="box">
            {range(props.top.boxes.length).map(i => (
              <React.Fragment key={i}>
                <BoxHeader
                  key={i}
                  defaultText={props.top.boxes[i].header.defaultText}
                  contentState={props.top.boxes[i].header.contentState}
                  src={props.top.boxes[i].header.src}
                  backgroundColor={props.top.boxes[i].header.backgroundColor}
                  onSave={state => this.onSaveBoxHeader(state, i)}
                />
                {this.createBoxContents()}
              </React.Fragment>
            ))}
          </div>

          <div className="subBanner mt-5 mb-5">{this.createSubBanners()}</div>
        </main>

        {/* <Footer
          {...props.common.footer}
          onSave={this.onSaveFooter.bind(this)}
        /> */}
      </React.Fragment>
    )
  }
}
