import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import withIFrameable from 'components/templates/withIFrameable'
import TopPage from 'components/templates/edit_view_shared/TopPage'

const IFramedTop = withIFrameable(TopPage)

class Home extends React.Component {
  // For the initial page load, getInitialProps will execute on the server only.
  // getInitialProps will only be executed on the client when navigating to a
  // different route via the Link component or using the routing APIs.
  static async getInitialProps({ ctx }) {
    // 最初のFETCHはInfiniteScrollで行ってくれる想定

    // TODO: querystringに、カテゴリフィルタが付与されていたら表示するコンテンツを限定する

    // ctx.query contains URL params
    // ?edit=true is added when the page is edit mode
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
        <this.TopPage {...props} />
      </React.Fragment>
    )
  }
}

export default connect()(Home)
