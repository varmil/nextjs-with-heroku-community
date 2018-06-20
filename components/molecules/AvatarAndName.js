import React from 'react'

export default class AvatarAndName extends React.Component {
  render() {
    const props = this.props

    return (
      <div style={props.style}>
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="Avatar"
          className="avatar mr-3"
        />

        <div className="nameContainer">
          <span className="name font-weight-bold">
            {props.name || 'Your Name Here'}
          </span>
        </div>

        <style jsx>{`
          .avatar {
            vertical-align: middle;
            width: ${props.size || 44}px;
            height: ${props.size || 44}px;
            border-radius: 50%;
          }

          .nameContainer {
            display: inline-flex;
          }

          .name {
            white-space: nowrap;
            overflow: hidden;
            width: 180px;
            text-overflow: ellipsis;
          }
        `}</style>
      </div>
    )
  }
}
