import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import isNil from 'lodash/isNil'
import { AppTalkRoom, AppNews } from 'constants/ActionTypes'
import withIFrameable from 'components/templates/withIFrameable'
import TopPage from 'components/templates/edit_view_shared/TopPage'
import BoxType from '/../shared/constants/BoxType'

const IFramedTop = withIFrameable(TopPage)

class Home extends React.Component {
  // For the initial page load, getInitialProps will execute on the server only.
  // getInitialProps will only be executed on the client when navigating to a
  // different route via the Link component or using the routing APIs.
  // 最初のFETCHはInfiniteScrollで行ってくれる想定
  static async getInitialProps({ ctx }) {
    // ctx.query contains URL params
    const { edit, slug, categoryIndex } = ctx.query
    const { dispatch } = ctx.store

    // set active category index (also trigger when qs is changed)
    switch (slug) {
      case BoxType.slug[BoxType.index.talk]:
        if (!isNil(categoryIndex)) {
          dispatch(
            createAction(AppTalkRoom.SET_ACTIVE_CATEGORY)(+categoryIndex)
          )
        }
        break
      case BoxType.slug[BoxType.index.news]:
        if (!isNil(categoryIndex)) {
          dispatch(createAction(AppNews.SET_ACTIVE_CATEGORY)(+categoryIndex))
        }
        break
      default:
    }

    /**
     * edit:
     * ?edit=true is added when the page is edit mode
     */
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
