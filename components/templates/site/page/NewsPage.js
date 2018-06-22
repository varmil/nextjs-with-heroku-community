import { connect } from 'react-redux'
import TalkBox from 'components/templates/site/page/TalkBox'
import { setNewsCategories, setNewsDesc } from 'actions/site'

class NewsPage extends TalkBox {
  /**
   * Edit Handler START
   */
  onSaveDesc(state) {
    if (state.text.length === 0) return
    this.props.dispatch(setNewsDesc({ ...state }))
  }

  onSaveInputForm(state) {}

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
  boxHeader: state.site.top.boxes[2].header,
  pageData: state.site.news
}))(NewsPage)
