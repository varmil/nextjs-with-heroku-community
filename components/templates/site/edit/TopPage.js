import React from 'react'
import NavBar from 'components/organisms/site/base/NavBar'
import MenuBar from 'components/organisms/site/base/MenuBar'
import MainBanner from 'components/organisms/site/base/MainBanner'
import BoxHeader from 'components/organisms/site/base/BoxHeader'
import BoxContent from 'components/organisms/site/base/BoxContent'
import SubBunner from 'components/organisms/site/base/SubBunner'
import Footer from 'components/organisms/site/base/Footer'

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
          <BoxContent className="col-3 px-1" />
          <BoxContent className="col-3 px-1" />
          <BoxContent className="col-3 px-1" />
          <BoxContent className="col-3 px-1" />
        </div>
      </div>
    )
  }

  createSubBunners() {
    return (
      <div className="container">
        <div className="row justify-content-center px-3">
          <SubBunner className="col-6 py-3" />
          <SubBunner className="col-6 py-3" />
          <SubBunner className="col-6 py-3" />
          <SubBunner className="col-6 py-3" />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={`${this.props.className}`} style={this.props.style}>
        <header className="">
          <NavBar />
          <MenuBar />
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

          <div className="subBunner mt-5 mb-5">{this.createSubBunners()}</div>
        </main>

        <footer className="">
          <Footer />
        </footer>

        <style jsx>{``}</style>
      </div>
    )
  }
}
