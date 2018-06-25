import { connect } from 'react-redux'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import { setTalkRoomCategories } from 'actions/site'

class TalkRoomContents extends BoxContents {
  /**
   * Edit Handler START
   */
  onSaveCategory(state) {
    this.props.dispatch(setTalkRoomCategories({ ...state }))
  }
  /**
   * Edit Handler END
   */
}

export default connect(state => ({
  common: state.site.common,

  // TALK BOX由来のページでは共通して使う。
  // TODO: box固定で指定してるので増減対応
  boxHeader: state.site.top.boxes[0].header,
  pageData: state.site.talkroom
}))(TalkRoomContents)
