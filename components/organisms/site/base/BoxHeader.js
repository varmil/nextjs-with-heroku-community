import React from 'react'

export default class BoxHeader extends React.Component {
  render() {
    return (
      <div
        className={`container ${this.props.className}`}
        style={this.props.style}
      >
        <div className="bg rounded-0">
          <div className="container">
            <div className="row justify-content-center">
              <h4 className="col-8">{this.props.text}</h4>
              <h4 className="col-2 text-right">
                <i className="fas fa-chevron-right" />
              </h4>
            </div>
          </div>
        </div>

        <style jsx>{`
          .bg {
            padding: 23px 0 15px;
            background-color: antiquewhite;
          }
        `}</style>
      </div>
    )
  }
}
