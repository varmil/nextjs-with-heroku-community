import React from 'react'
import WelcomeElement from 'components/organisms/site/base/Welcome'

export default class WelcomePage extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <WelcomeElement
          contentState={props.welcome.contentState}
          src={props.welcome.src}
          backgroundColor={props.welcome.backgroundColor}
        />
      </React.Fragment>
    )
  }
}
