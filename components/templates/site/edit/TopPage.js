import React from 'react'
import NavBar from 'components/organisms/site/edit/NavBar'
import MenuBar from 'components/organisms/site/edit/MenuBar'
import MainBanner from 'components/organisms/site/edit/MainBanner'
import BoxHeader from 'components/organisms/site/edit/BoxHeader'
import BoxContent from 'components/organisms/site/edit/BoxContent'
import SubBanner from 'components/organisms/site/edit/SubBanner'
import Footer from 'components/organisms/site/edit/Footer'
import { setMenuBarStyle, setMenuBarItem } from 'actions/site'

const initialState = {}

export default class TopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  createBoxContents() {
    return (
      <div className="container mt-2 mb-5">
        <div className="row justify-content-center px-3">
          <BoxContent className="col-xs-12 col-sm-6 col-md-3 p-1" />
          <BoxContent className="col-xs-12 col-sm-6 col-md-3 p-1" />
          <BoxContent className="col-xs-12 col-sm-6 col-md-3 p-1" />
          <BoxContent className="col-xs-12 col-sm-6 col-md-3 p-1" />
        </div>
      </div>
    )
  }

  createSubBanners() {
    return (
      <div className="container">
        <div className="row justify-content-center px-3">
          <SubBanner className="col-6 py-3" />
          <SubBanner className="col-6 py-3" />
          <SubBanner className="col-6 py-3" />
          <SubBanner className="col-6 py-3" />
        </div>
      </div>
    )
  }

  onSaveMenuBar(state) {
    this.props.dispatch(setMenuBarStyle(state.style))
    this.props.dispatch(setMenuBarItem(state.item))
  }

  render() {
    const props = this.props
    return (
      <div className={`${props.className}`} style={props.style}>
        <header className="">
          <NavBar />
          <MenuBar
            onSave={this.onSaveMenuBar.bind(this)}
            style={props.common.menuBar.style}
            item={props.common.menuBar.item}
          />
          <MainBanner className="mb-5" />
        </header>

        <main className="">
          <div className="box">
            <BoxHeader text="トークルーム" />
            {this.createBoxContents()}

            <BoxHeader text="企業発信" />
            {this.createBoxContents()}

            <BoxHeader text="企業ストーリー" />
            {this.createBoxContents()}

            <BoxHeader text="投票・アンケート" />
            {this.createBoxContents()}

            <BoxHeader text="お知らせ" />
            {this.createBoxContents()}
          </div>

          <div className="subBunner mt-5 mb-5">{this.createSubBanners()}</div>
        </main>

        <footer className="">
          <Footer />
        </footer>
      </div>
    )
  }
}
