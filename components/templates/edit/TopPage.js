import React from 'react'
import NavBar from '../../organisms/edit/NavBar'
import MenuBar from '../../organisms/edit/MenuBar'

const initialState = {}

export default class TopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <div className={`${this.props.className}`} style={this.props.style}>
        <header className="">
          <section className="navBar">
            <NavBar />
          </section>
          <section className="menuBar">
            <MenuBar />
          </section>
        </header>
        <main className="" />
        <footer className="" />

        <style jsx>{``}</style>
      </div>
    )
  }
}
