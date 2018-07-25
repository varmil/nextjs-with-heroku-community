import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { AppNews, SiteNews } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'

class NewsContents extends BoxContents {
  state = {
    disableInfiniteScroll: false
  }

  constructor(props) {
    super(props)
    this.categories = {
      action: SiteNews.SET_CATEGORIES,
      propsPath: `${PATH_MAP.NEWS_CATEGORIES}`
    }
    this.subBanner = {
      action: SiteNews.SET_SUB_BANNER,
      propsPath: `${PATH_MAP.NEWS_SUB_BANNER}`
    }
  }

  // HACK:
  // ここでContentsを空にする --> 同時にreplaceRouteも走っている
  // --> routeChangeが終わるとprops.categoryIndexが変わる。
  // --> InfiniteScrollがRe-Mountされる。 --> 新しいContentsを内部でfetchする
  //
  // ここでdisableにするのは、空にした瞬間「現在の」InfiniteScrollが暴発して次のページを読み込もうとするため。
  // 待つ秒数は適当
  onChangeCategory(index) {
    this.setState({ ...this.state, disableInfiniteScroll: true })
    this.props.dispatch(createAction(AppNews.RESET_CONTENTS)())
    setTimeout(() => {
      this.setState({ ...this.state, disableInfiniteScroll: false })
    }, 50)
  }

  render() {
    const { boxContents, disabled } = this.props
    return (
      <React.Fragment>
        {this.createCategorySelect()}

        <InfiniteScroll
          disabled={disabled}
          action={AppNews.FETCH_REQUEST}
          length={boxContents.length}
        >
          {super.render()}
        </InfiniteScroll>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  subBanner: objectPath.get(state.site, `${PATH_MAP.NEWS_SUB_BANNER}`),
  // TALK BOX由来のページでは共通して使う。
  pageData: state.site.news,
  boxContents: state.app.news.boxContents
}))(NewsContents)
