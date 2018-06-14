import React from 'react'

export default class MainBanner extends React.Component {
  render() {
    return (
      <div className={`${this.props.className}`} style={this.props.style}>
        <div className="container">
          <img src={this.props.src} alt="main banner" />
        </div>

        <style jsx>{`
          img {
            width: 100%;
            object-fit: cover;
          }
        `}</style>
      </div>
    )
  }
}
