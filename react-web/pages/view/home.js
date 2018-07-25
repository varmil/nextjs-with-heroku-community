import React from 'react'
import { connect } from 'react-redux'
import withIFrameable from 'components/templates/withIFrameable'
import TopPage from 'components/templates/edit_view_shared/TopPage'

const IFramedTop = withIFrameable(TopPage)

class Home extends React.Component {
  // For the initial page load, getInitialProps will execute on the server only.
  // getInitialProps will only be executed on the client when navigating to a
  // different route via the Link component or using the routing APIs.
  // 最初のFETCHはInfiniteScrollで行ってくれる想定
  static async getInitialProps({ ctx }) {
    // ctx.query contains URL params
    const { edit, slug, categoryIndex } = ctx.query

    /**
     * edit:
     * ?edit=true is added when the page is edit mode
     *
     * categoryIndex:
     * querystringに、カテゴリフィルタが付与されていたら表示するコンテンツを限定する
     */
    return { edit: !!edit, slug: slug || '', categoryIndex }
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
