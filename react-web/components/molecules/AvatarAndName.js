import React from 'react'
import Avatar from 'components/atoms/Avatar'

export default class extends React.Component {
  render() {
    const props = this.props

    return (
      <div style={props.style}>
        <Avatar
          src="https://www.w3schools.com/w3images/avatar2.png"
          className="mr-3"
          size={props.size}
        />

        <div className="nameContainer">
          <span className="name font-weight-bold">
            {props.name || 'Your Name Here'}
          </span>
        </div>

        <style jsx>{`
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
