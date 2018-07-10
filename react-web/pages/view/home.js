import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import withIFrameable from 'components/templates/withIFrameable'
import TopPage from 'components/templates/edit_view_shared/TopPage'
import { AppTalkRoom, AppVoice, AppNews } from 'constants/ActionTypes'

const IFramedTop = withIFrameable(TopPage)

class Home extends React.Component {
  // For the initial page load, getInitialProps will execute on the server only.
  // getInitialProps will only be executed on the client when navigating to a
  // different route via the Link component or using the routing APIs.
  static async getInitialProps({ ctx }) {
    // homeで使用するデータは全て事前にFETCHしないといけない。（TALK, NEWS, VOICE...）
    // fetch only first time, 便宜的にcontentsの長さで判定
    // 見た目のデザインは一括でsetする（DBにstate.siteがまるっと入っているので）
    // 最初のFETCHはInfiniteScrollで行ってくれる想定
    // const { talk, voice, news } = ctx.store.getState().app
    // const { dispatch } = ctx.store
    // if (ctx.isServer || talk.boxContents.length === 0) {
    //   // dispatch(createAction(AppTalkRoom.FETCH_REQUEST)({ released: true }))
    // }
    // if (ctx.isServer || voice.boxContents.length === 0) {
    //   // dispatch(createAction(AppVoice.FETCH_REQUEST)({ released: true }))
    // }
    // if (ctx.isServer || news.boxContents.length === 0) {
    //   // dispatch(createAction(AppNews.FETCH_REQUEST)({ released: true }))
    // }

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

export default connect(state => ({
  // top: state.site.top
}))(Home)
