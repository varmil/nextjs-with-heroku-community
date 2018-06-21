import React from 'react'
import { connect } from 'react-redux'
import WelcomePage from 'components/templates/site/page/WelcomePage'
import WelcomeElement from 'components/organisms/site/base/Welcome'

class Welcome extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <WelcomePage {...props} welcomeElement={WelcomeElement} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  welcome: state.site.welcome
}))(Welcome)
