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
  state = {
    disableInfiniteScroll: false
  }

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

  // HACK:
  // ここでContentsを空にする --> 同時にreplaceRouteも走っている
  // --> routeChangeが終わるとprops.categoryIndexが変わる。
  // --> InfiniteScrollがRe-Mountされる。 --> 新しいContentsを内部でfetchする
  //
  // ここでdisableにするのは、空にした瞬間「現在の」InfiniteScrollが暴発して次のページを読み込もうとするため。
  // 待つ秒数は適当
  onChangeCategory(index) {
    this.setState({ ...this.state, disableInfiniteScroll: true })
    this.props.dispatch(createAction(AppTalkRoom.RESET_CONTENTS)())
    setTimeout(() => {
      this.setState({ ...this.state, disableInfiniteScroll: false })
    }, 50)
  }

  render() {
    const { mainBanner, boxContents, disabled, categoryIndex } = this.props
    const { disableInfiniteScroll } = this.state
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

        <InfiniteScroll
          // force reset when categoryIndex changed
          key={categoryIndex}
          disabled={disabled || disableInfiniteScroll}
          action={AppTalkRoom.FETCH_REQUEST}
          length={boxContents.length}
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
  // TALK BOX由来のページでは共通して使う。
  pageData: state.site.talk,
  boxContents: state.app.talk.boxContents
}))(TalkRoomContents)
