import React from 'react'
import Link from 'next/link'

export default class PreInputForm extends React.Component {
  render() {
    const props = this.props

    return (
      <React.Fragment>
        <Link href={props.href}>
          <div className="inner p-4">
            <span>{props.text}</span>
            <i className="fas fa-image" />
          </div>
        </Link>

        <style jsx>{`
          .inner {
            position: relative;
            color: gray;
            border: 2px solid gray;
            border-radius: 25px;
          }

          span {
            display: inline-block;
            width: 80%;
            font-size: 12px;
          }

          .inner i {
            position: absolute;
            right: 20px;
            top: 22px;
            font-size: 30px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
