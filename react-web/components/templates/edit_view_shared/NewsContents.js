import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { AppNews, SiteNews } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'

class NewsContents extends BoxContents {
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

  onChangeCategory(index) {
    const { dispatch } = this.props
    dispatch(createAction(AppNews.RESET_CONTENTS)())
    dispatch(createAction(AppNews.SET_ACTIVE_CATEGORY)(index))
  }

  render() {
    const { boxContents, disabled, activeCategoryIndex } = this.props
    return (
      <React.Fragment>
        {this.createCategorySelect()}

        <InfiniteScroll
          // force reset when activeCategoryIndex changed
          key={activeCategoryIndex}
          disabled={disabled}
          action={AppNews.FETCH_REQUEST}
          length={boxContents.length}
          fetchOption={{ activeCategoryIndex }}
        >
          {super.render()}
        </InfiniteScroll>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  subBanner: objectPath.get(state.site, `${PATH_MAP.NEWS_SUB_BANNER}`),
  activeCategoryIndex: state.app.news.activeCategoryIndex,

  // TALK BOX由来のページでは共通して使う。
  pageData: state.site.news,
  boxContents: state.app.news.boxContents
}))(NewsContents)
