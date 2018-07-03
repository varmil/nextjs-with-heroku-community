import React from 'react'

export default class extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <img
          src={props.src}
          alt="Avatar"
          className={`avatar ${props.className}`}
          style={props.style}
        />

        <style jsx>{`
          .avatar {
            vertical-align: middle;
            width: ${props.size || 44}px;
            height: ${props.size || 44}px;
            border-radius: 50%;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
