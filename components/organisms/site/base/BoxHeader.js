import React from 'react'
import TextViewer from 'components/atoms/TextViewer'

export default class BoxHeader extends React.Component {
  render() {
    const props = this.props
    return (
      <div className={`container ${props.className}`} style={props.style}>
        <div className="bg rounded-0">
          <div className="container">
            <div className="row justify-content-center">
              <h4 className="col-8 mb-0">
                <TextViewer
                  value={props.contentState}
                  defaultText={props.defaultText}
                />
              </h4>
              <h4 className="icon col-2 text-right m-0">
                <i className="fas fa-chevron-right" />
              </h4>
            </div>
          </div>
        </div>

        <style jsx>{`
          .bg {
            padding: 0;
            background-color: antiquewhite;
          }

          .icon {
            line-height: 76px;
          }
        `}</style>
      </div>
    )
  }
}
