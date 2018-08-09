import React from 'react'
import { connect } from 'react-redux'
import NavBar from 'components/templates/container/NavBar'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <header>
          <NavBar />
        </header>
      </React.Fragment>
    )
  }
}

export default connect(state => ({}))(Header)
