import React from 'react'
import { connect } from 'react-redux'
import TopPage from 'components/templates/edit_view_shared/TopPage'
import MainBanner from 'components/organisms/site/base/MainBanner'
import CategorySelect from 'components/organisms/site/base/CategorySelect'
import SubBanner from 'components/organisms/site/base/SubBanner'

const initialState = {}

class Home extends React.Component {
  // ctx.query contains URL params
  static async getInitialProps({ ctx }) {
    return { slug: ctx.query.slug || '' }
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <TopPage
          {...props}
          mainBanner={MainBanner}
          // これはTopPageの中でImportすべきか。いや、ここでやるべきな気がする。
          // ViewとEditを区別できるのはpageレベルなので
          categorySelect={CategorySelect}
          subBanner={SubBanner}
        />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  top: state.site.top
}))(Home)
