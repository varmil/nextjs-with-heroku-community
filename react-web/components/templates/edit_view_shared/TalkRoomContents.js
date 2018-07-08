import React from 'react'
import { connect } from 'react-redux'
import range from 'lodash/range'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { SiteTalkRoom } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import MainBanner from 'components/organisms/site/base/MainBanner'

class TalkRoomContents extends BoxContents {
  constructor(props) {
    super(props)
    this.categories = {
      action: SiteTalkRoom.SET_CATEGORIES,
      propsPath: `${PATH_MAP.TALK_CATEGORIES}`
    }
    this.subBanner = {
      action: SiteTalkRoom.SET_SUB_BANNER,
      propsPath: `${PATH_MAP.TALK_SUB_BANNER}`
    }
  }

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
  mainBanner: objectPath.get(state.site, `${PATH_MAP.MAIN_BANNER}`),
  subBanner: objectPath.get(state.site, `${PATH_MAP.TALK_SUB_BANNER}`),
  // TALK BOX由来のページでは共通して使う。
  pageData: state.site.talk,
  boxContents: state.app.talk.boxContents
}))(TalkRoomContents)
