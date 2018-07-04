import React from 'react'
import { Link } from 'routes'
import { connect } from 'react-redux'
import withIFrameable from 'components/templates/withIFrameable'
import WelcomePage from 'components/templates/edit_view_shared/WelcomePage'

const IFramedWelcome = withIFrameable(WelcomePage)

class Welcome extends React.Component {
  // ?edit=true is added when the page is edit mode
  static async getInitialProps({ ctx }) {
    const { edit, slug } = ctx.query
    return { edit: !!edit, slug: slug || '' }
  }

  componentWillMount() {
    this.WelcomePage = this.props.edit ? IFramedWelcome : WelcomePage
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <Link route={'/view/signup/profile'} passHref>
          <a>
            <this.WelcomePage {...props} />
          </a>
        </Link>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  welcome: state.site.welcome
}))(Welcome)
