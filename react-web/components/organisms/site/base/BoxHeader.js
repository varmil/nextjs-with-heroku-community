import React from 'react'
import { getTextRGB } from 'utils/editor'
import TextViewer from 'components/atoms/TextViewer'

const Title = props => {
  return (
    <React.Fragment>
      <h4 className={`mb-0 ${props.className}`}>
        <TextViewer
          value={props.contentState}
          defaultText={props.defaultText}
        />
      </h4>

      <style jsx>{`
        h4 {
          color: white;
        }
      `}</style>
    </React.Fragment>
  )
}

export default class BoxHeader extends React.Component {
  createContents() {
    const props = this.props
    if (this.props.icon === false) {
      return (
        <React.Fragment>
          <Title
            className="mb-0"
            contentState={props.contentState}
            defaultText={props.defaultText}
          />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Title
            className="mb-0 col-8"
            contentState={props.contentState}
            defaultText={props.defaultText}
          />
          <h4 className="icon col-2 text-right m-0">
            <i className="fas fa-chevron-right" />
          </h4>

          <style jsx>{`
            .icon {
              color: white;
              line-height: 76px;
              color: ${getTextRGB(props.contentState) || 'white'};
            }
          `}</style>
        </React.Fragment>
      )
    }
  }

  render() {
    const props = this.props

    return (
      <div
        id="p"
        className={`container ${props.className}`}
        style={{ ...props.style }}
      >
        <div className="bg rounded-0">
          <div className="container">
            <div className="row justify-content-center">
              {this.createContents()}
            </div>
          </div>
        </div>

        <style jsx>{`
          #p {
            height: 76px;
            background-color: ${props.backgroundColor};
            background-image: url("${props.src}");
            background-size: contain;
          }

          .bg {
            padding: 0;
          }
        `}</style>
      </div>
    )
  }
}
