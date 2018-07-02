import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div className="sharedContainer">
        {this.props.children}

        <style jsx>{`
          .sharedContainer {
            width: 90%;
            max-width: 360px;
            margin: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: ${this.props.height}px;
          }
        `}</style>
      </div>
    )
  }
}
