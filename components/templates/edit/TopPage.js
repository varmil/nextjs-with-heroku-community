import React from 'react'
import NavBar from '../../organisms/edit/NavBar'
import MenuBar from '../../organisms/edit/MenuBar'
import MainBanner from '../../organisms/edit/MainBanner'
import BoxHeader from '../../organisms/edit/BoxHeader'
import BoxContent from '../../organisms/edit/BoxContent'
import Footer from '../../organisms/edit/Footer'

const initialState = {}

export default class TopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  createBoxContents() {
    return (
      <div className="container mt-3 mb-5">
        <div className="row justify-content-center px-3">
          <BoxContent className="col-3 px-1" />
          <BoxContent className="col-3 px-1" />
          <BoxContent className="col-3 px-1" />
          <BoxContent className="col-3 px-1" />
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
        </main>

        <footer className="">
          <Footer />
        </footer>

        <style jsx>{``}</style>
      </div>
    )
  }
}
