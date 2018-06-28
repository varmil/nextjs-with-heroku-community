import React from 'react'
import { connect } from 'react-redux'
import withIFrameable from 'components/templates/withIFrameable'
import TopPage from 'components/templates/edit_view_shared/TopPage'
// import CategorySelect from 'components/organisms/site/base/CategorySelect'
import SubBanner from 'components/organisms/site/base/SubBanner'

const IFramedTop = withIFrameable(TopPage)

class Home extends React.Component {
  // ctx.query contains URL params
  // ?edit=true is added when the page is edit mode
  static async getInitialProps({ ctx }) {
    const { edit, slug } = ctx.query
    return { edit: !!edit, slug: slug || '' }
  }

  componentWillMount() {
    this.TopPage = this.props.edit ? IFramedTop : TopPage
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <this.TopPage {...props} subBanner={SubBanner} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  top: state.site.top
}))(Home)
