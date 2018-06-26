import React from 'react'
import Classes from 'constants/Classes'
import TextViewer from 'components/atoms/TextViewer'

const MAX_HEIGHT = '250px'

export default class MainBanner extends React.Component {
  render() {
    const props = this.props
    return (
      <a
        className={`bg container ${Classes.EDITABLE} ${props.className}`}
        href={props.href}
        data-modal={`TextBGImageModal`}
        data-index={props.index}
        data-action={'ACTION_TYPE'}
      >
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
