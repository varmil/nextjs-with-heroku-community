import React from 'react'
import { connect } from 'react-redux'
import WelcomePage from 'components/templates/site/page/WelcomePage'

class Welcome extends React.Component {
  static async getInitialProps(props) {}

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <WelcomePage {...props} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  preview: state.site.preview,
  common: state.site.common,
  welcome: state.site.welcome
}))(Welcome)
