import React from 'react'
import Avatar from 'components/atoms/Avatar'
import { Link } from 'routes'

export default class extends React.Component {
  render() {
    const props = this.props

    return (
      <div className="wrap" style={props.style}>
        <div className="avatarContainer">
          <Avatar src={props.src} className="mr-3" size={props.size} />
        </div>

        <div className="nameContainer">
          <span className="name font-weight-bold">
            <Link route={'/view/account'} passHref>
              <a>{props.name || 'Your Name Here'}</a>
            </Link>
          </span>
        </div>

        <style jsx>{`
          a {
            color: #2b6eb2;
          }

          .wrap {
            position: relative;
          }

          .avatarContainer {
            display: inline-block;
            width: ${props.size}px;
          }

          .nameContainer {
            display: inline-flex;
            margin-left: 15px;
          }

          .name {
            float: left;
            white-space: nowrap;
            overflow: hidden;
            width: 190px;
            text-overflow: ellipsis;
          }
        `}</style>
      </div>
    )
  }
}
