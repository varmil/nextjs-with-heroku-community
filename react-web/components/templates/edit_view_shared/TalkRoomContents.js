import React from 'react'
import { connect } from 'react-redux'
import range from 'lodash/range'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import { setTalkRoomCategories } from 'actions/site'
import MainBanner from 'components/organisms/site/base/MainBanner'

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

  render() {
    const { mainBanner } = this.props
    return (
      <React.Fragment>
        {this.createCategorySelect()}

        {range(mainBanner.length).map(i => (
          <MainBanner
            key={i}
            className="mb-3"
            contentState={mainBanner[i].contentState}
            src={mainBanner[i].src}
            backgroundColor={mainBanner[i].backgroundColor}
            href={mainBanner[i].href}
            index={i}
            propsPath={`${PATH_MAP.MAIN_BANNER}.${i}`}
          />
        ))}

        {super.render()}
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  mainBanner: objectPath.get(state.site, `${PATH_MAP.MAIN_BANNER}`),

  // TALK BOX由来のページでは共通して使う。
  // TODO: box固定で指定してるので増減対応
  boxHeader: state.site.top.boxes[0].header,
  pageData: state.site.talkroom
}))(TalkRoomContents)
