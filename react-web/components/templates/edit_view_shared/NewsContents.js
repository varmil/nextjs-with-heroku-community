import React from 'react'
import { connect } from 'react-redux'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { SiteNews } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'

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

  render() {
    return (
      <React.Fragment>
        {this.createCategorySelect()}
        {super.render()}
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
