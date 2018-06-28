import React from 'react'
import Classes from 'constants/Classes'
import TextViewer from 'components/atoms/TextViewer'
import { SiteWelcome } from 'constants/ActionTypes'
import { PATH_MAP } from 'reducers/site'

export default class BoxHeader extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <main
          className={`main ${Classes.EDITABLE} ${props.className}`}
          data-modal={`TextBGImageModal`}
          data-action={SiteWelcome.SET_WELCOME}
          data-path={PATH_MAP.WELCOME}
        >
          <h2 className="">
            <TextViewer value={props.contentState} />
          </h2>
        </main>

        <style global jsx>{`
          html,
          body,
          #__next,
          #editBody,
          #editableContainer {
            height: 100%;
          }

          #editBody {
            height: 667px;
          }
        `}</style>

        <style jsx>{`
          h2 {
            position: absolute;
            bottom: 3%;
            left: 0%;
            width: 100%;
          }
          .main {
            /* The image used */
            background-color: ${props.backgroundColor};
            background-image: url(${props.src});

            /* Full height */
            height: 100%;

            /* Center and scale the image nicely */
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
