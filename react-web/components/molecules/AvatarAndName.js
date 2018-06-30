import React from 'react'
import Avatar from 'components/atoms/Avatar'
import { Link } from 'routes'

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
            <Link route={'/view/account'} passHref>
              <a>{props.name || 'Your Name Here'}</a>
            </Link>
          </span>

          <span className="date">{props.date || ''}</span>
        </div>

        <style jsx>{`
          a {
            color: #2b6eb2;
          }
          .nameContainer {
            display: inline-block;
          }

          .name {
            white-space: nowrap;
            overflow: hidden;
            width: 170px;
            text-overflow: ellipsis;
          }

          .date {
            position: absolute;
            right: 25px;
            font-size: 0.7rem;
          }
        `}</style>
      </div>
    )
  }
}
