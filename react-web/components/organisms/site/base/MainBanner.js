import React from 'react'
import Classes from 'constants/Classes'
import TextViewer from 'components/atoms/TextViewer'
import { SiteTop } from 'constants/ActionTypes'

const MAX_HEIGHT = '250px'

export default class MainBanner extends React.Component {
  render() {
    const props = this.props
    return (
      <a
        className={`bg container ${Classes.EDITABLE} ${props.className}`}
        href={props.href}
        data-modal={`TextBGImageModal`}
        data-action={SiteTop.SET_MAIN_BANNER}
        data-index={props.index}
        data-path={props.propsPath}
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
        `}</style>
      </a>
    )
  }
}
