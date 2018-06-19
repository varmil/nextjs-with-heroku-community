import React from 'react'
import TextViewer from 'components/atoms/TextViewer'

const MAX_HEIGHT = '250px'

export default class SubBanner extends React.Component {
  render() {
    const props = this.props
    return (
      <a className={`bg container ${props.className}`} href={props.href}>
        <TextViewer value={props.contentState} />

        <style jsx>{`
          a{
            color: initial;
          }

          .container {
            display: block;
            padding-top: 30px;
            padding-bottom: 30px;
            max-height: ${MAX_HEIGHT};
            min-height: 116px;
            overflow: hidden;
          }

          .bg {
            background-color: ${props.backgroundColor};
            background-image: url("${props.src}");
            background-size: cover;
            background-position: center;
          }

          // .bgImg {
          //   width: 100%;
          //   object-fit: cover;
          //   position: relative;
          //   top: 0;
          //   left: 0;
          // }
        `}</style>
      </a>
    )
  }
}
