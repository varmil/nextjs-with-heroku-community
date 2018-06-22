import React from 'react'

export default class PageDescription extends React.Component {
  render() {
    const props = this.props

    return (
      <div
        className={`font-weight-bold ${props.className}`}
        style={{ ...props.style }}
      >
        {props.text}
      </div>
    )
  }
}
