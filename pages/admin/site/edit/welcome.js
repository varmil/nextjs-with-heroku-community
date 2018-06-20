import React from 'react'
import { connect } from 'react-redux'
import Edit from 'components/templates/Edit'
import WelcomePage from 'components/templates/site/page/WelcomePage'

class EditWelcome extends React.Component {
  render() {
    return (
      <Edit>
        <WelcomePage {...this.props} edit={true} />
      </Edit>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  welcome: state.site.welcome
}))(EditWelcome)
