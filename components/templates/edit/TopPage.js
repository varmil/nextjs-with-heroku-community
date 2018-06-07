import React from 'react'

const initialState = {}

export default class TopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <div className={`${this.props.className}`} style={this.props.style}>
        <main className="" />

        <style jsx>{``}</style>
      </div>
    )
  }
}
