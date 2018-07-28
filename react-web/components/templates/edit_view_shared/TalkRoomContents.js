import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import range from 'lodash/range'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { AppTalkRoom, SiteTalkRoom } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import MainBanner from 'components/organisms/site/base/MainBanner'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'

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

  onChangeCategory(index) {
    const { dispatch, onCategoryChanged } = this.props
    dispatch(createAction(AppTalkRoom.RESET_CONTENTS)())
    dispatch(createAction(AppTalkRoom.SET_ACTIVE_CATEGORY)(index))
    // HACK: state反映が終わってから発火
    setTimeout(() => onCategoryChanged(), 0)
  }

  render() {
    const {
      mainBanner,
      boxContents,
      disabled,
      activeCategoryIndex
    } = this.props
    return (
      <React.Fragment>
        {this.createCategorySelect()}

        {range(mainBanner.length).map(i => (
          <MainBanner
            key={i}
            className="mb-0"
            contentState={mainBanner[i].contentState}
            src={mainBanner[i].src}
            backgroundColor={mainBanner[i].backgroundColor}
            href={mainBanner[i].href}
            index={i}
            propsPath={`${PATH_MAP.MAIN_BANNER}.${i}`}
          />
        ))}

        <InfiniteScroll
          // force reset when activeCategoryIndex changed
          key={activeCategoryIndex}
          disabled={disabled}
          action={AppTalkRoom.FETCH_REQUEST}
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
  mainBanner: objectPath.get(state.site, `${PATH_MAP.MAIN_BANNER}`),
  subBanner: objectPath.get(state.site, `${PATH_MAP.TALK_SUB_BANNER}`),
  activeCategoryIndex: state.app.talk.activeCategoryIndex,

  // TALK BOX由来のページでは共通して使う。
  pageData: state.site.talk,
  boxContents: state.app.talk.boxContents
}))(TalkRoomContents)
