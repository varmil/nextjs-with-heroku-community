import React from 'react'

export default class SubBanner extends React.Component {
  render() {
    return (
      <div className={`${this.props.className}`} style={this.props.style}>
        <div className="container">
          <img src={this.props.src} alt="sub banner" />
        </div>

        <style jsx>{`
          img {
            width: 100%;
            height: 180px;
            object-fit: contain;
          }
        `}</style>
      </div>
    )
  }
}
