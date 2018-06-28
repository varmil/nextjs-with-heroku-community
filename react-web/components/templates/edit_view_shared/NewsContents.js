import { connect } from 'react-redux'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import { setNewsCategories } from 'actions/site'

class NewsContents extends BoxContents {
  /**
   * Edit Handler START
   */
  onSaveCategory(state) {
    this.props.dispatch(setNewsCategories({ ...state }))
  }
  /**
   * Edit Handler END
   */
}

export default connect(state => ({
  common: state.site.common,

  // TALK BOX由来のページでは共通して使う。
  // TODO: box固定で指定してるので増減対応
  // boxHeader: state.site.top.boxes[2].header,
  pageData: state.site.talkroom
}))(NewsContents)
