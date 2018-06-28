import React from 'react'
import { connect } from 'react-redux'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'

class NewsContents extends BoxContents {
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
  // TALK BOX由来のページでは共通して使う。
  subBanner: objectPath.get(state.site, `${PATH_MAP.NEWS_SUB_BANNER}`),
  pageData: state.site.news
}))(NewsContents)
