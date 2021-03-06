import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import { withStyles } from '@material-ui/core/styles'
import findIndex from 'lodash/findIndex'
// import isNil from 'lodash/isNil'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { SiteTop } from 'constants/ActionTypes'
import FixedButton from 'components/atoms/FixedButton'
import Header from 'components/templates/container/Header'
import TalkRoomContents from 'components/templates/edit_view_shared/TalkRoomContents'
import VoiceContents from 'components/templates/edit_view_shared/VoiceContents'
import NewsContents from 'components/templates/edit_view_shared/NewsContents'
import Classes from 'constants/Classes'
import BoxType from '/../shared/constants/BoxType'
import Role from '/../shared/constants/Role'
import URL from 'constants/URL'

const styles = {
  tabRoot: { minHeight: 40 },
  labelContainer: { paddingBottom: 0, marginBottom: 0 }
}

// container height
// https://stackoverflow.com/questions/47095900/dynamic-height-for-material-ui-tab-containers

const Label = props => (
  <span>
    {props.text}
    <style jsx>{`
      span {
        color: ${props.color};
        font-size: 17px;
        font-weight: bold;
      }
    `}</style>
  </span>
)

class TopPage extends React.Component {
  constructor(props) {
    super(props)
    // decide initial tab index with URL props.slug
    let activeTabIndex = findIndex(props.boxes, box => box.slug === props.slug)
    // デフォルトはTALK
    // NOTE: Boxの並び順を示すindexと、BoxTypeのindexは異なるものなので注意
    if (activeTabIndex === -1) {
      activeTabIndex = findIndex(
        props.boxes,
        box => box.type === BoxType.index.talk
      )
    }

    this.state = {
      tabIndex: activeTabIndex,
      mainHeight: 0,
      // iOSだとカテゴリの横スクロールとSwipeableViewが競合するため
      isScrollingCategory: false
    }
  }

  setContentsHeight() {
    // get current height of active tab
    const height = document.querySelector(
      ".react-swipeable-view-container > div[aria-hidden='false']"
    ).clientHeight
    console.log('*****', height)
    this.setState({ ...this.state, mainHeight: height })
  }

  getIndicatorStyle() {
    return {
      backgroundColor: this.props.color.backgroundColor,
      height: 4
    }
  }

  // 管理者かどうか
  isAdmin() {
    const { user } = this.props
    return user.roleId >= Role.User.ADMIN_GUEST
  }

  // 現在アクティブになってるタブのslugをみて、penを出すか決める
  isShowPenIcon() {
    // 管理者なら常に表示
    if (this.isAdmin()) return true

    const { boxes } = this.props
    const curSlug = boxes[this.state.tabIndex].slug
    return curSlug === URL.TALK_SLUG
  }

  // tabIndex
  handleChangeIndex = tabIndex => {
    Router.replaceRoute(`${URL.VIEW_HOME}/${this.props.boxes[tabIndex].slug}`)
    this.setState({ tabIndex })
  }

  // TouchMoveされている間呼ばれ続ける。指を離すとFALSE
  setScrollingCategory = isScrollingCategory => {
    // 現在のStateと一致したら何もしない
    if (this.state.isScrollingCategory === isScrollingCategory) return
    this.setState({ isScrollingCategory })
  }

  // 引数のindexが現在のActiveTabIndexと一致すればtrue
  isActive(targetTabIndex) {
    return targetTabIndex === this.state.tabIndex
  }

  render() {
    const props = this.props
    const { classes } = this.props
    const { isScrollingCategory } = this.state

    return (
      <React.Fragment>
        <div id="ViewHomeHeader" className="sticky-top">
          <Header />

          <section
            className={`${Classes.EDITABLE}`}
            data-modal={`BoxesModal`}
            data-action={SiteTop.SET_BOXES}
            data-path={`${PATH_MAP.BOXES}`}
          >
            <Tabs
              className="tabs"
              value={this.state.tabIndex}
              onChange={(e, index) => this.handleChangeIndex(index)}
              TabIndicatorProps={{ style: this.getIndicatorStyle() }}
              // fullWidth
              // centered
              scrollable
              scrollButtons="off"
            >
              {props.boxes.map((box, i) => (
                <Tab
                  key={i}
                  label={
                    <Label
                      text={box.header.text}
                      color={
                        this.isActive(i)
                          ? props.color.backgroundColor
                          : '#5A5A5A'
                      }
                    />
                  }
                  className={`tab`}
                  classes={{
                    root: classes.tabRoot,
                    labelContainer: classes.labelContainer
                  }}
                />
              ))}
            </Tabs>
          </section>
        </div>

        <main>
          <SwipeableViews
            id="_SWViews"
            enableMouseEvents
            index={this.state.tabIndex}
            onChangeIndex={this.handleChangeIndex}
            onTransitionEnd={() => this.setContentsHeight()}
            disabled={isScrollingCategory}
          >
            <VoiceContents disabled={!this.isActive(0)} />
            <TalkRoomContents
              disabled={!this.isActive(1)}
              onCategoryChanged={() => this.setContentsHeight()}
              onTouchCategory={this.setScrollingCategory}
            />
            <NewsContents
              disabled={!this.isActive(2)}
              onCategoryChanged={() => this.setContentsHeight()}
              onTouchCategory={this.setScrollingCategory}
            />
          </SwipeableViews>

          {this.isShowPenIcon() ? (
            <FixedButton
              icon="fa-pen"
              backgroundColor={props.color.backgroundColor}
              to={
                this.isAdmin() ? '/admin/post/add/0?back=1' : '/view/editpost'
              }
            />
          ) : null}
        </main>

        <style global jsx>{`
          ::-webkit-scrollbar {
            display: none;
          }

          .sticky-top {
            background-color: white;
            overflow: hidden;
          }

          .tab {
            width: 130px;
            outline: none !important;
          }

          .react-swipeable-view-container > div[aria-hidden='false'] {
            min-height: 700px;
            height: 100%;
          }
          .react-swipeable-view-container > div[aria-hidden='true'] {
            height: ${this.state.mainHeight}px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

// export default withStyles(uiStyles)(TopPage)
export default withStyles(styles)(
  connect(state => ({
    user: state.user,
    boxes: objectPath.get(state.site, `${PATH_MAP.BOXES}.item`),
    color: objectPath.get(state.site, `${PATH_MAP.COLOR}`)
  }))(TopPage)
)
