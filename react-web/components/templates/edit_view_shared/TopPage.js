import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import findIndex from 'lodash/findIndex'
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
import URL from 'constants/URL'

// const styles = {
//   slideRoot: {},
//   slide: {}
// }

// container height
// https://stackoverflow.com/questions/47095900/dynamic-height-for-material-ui-tab-containers

const Label = props => (
  <span>
    {props.text}
    <style jsx>{`
      span {
        font-size: 25px;
        font-weight: 900;
      }
    `}</style>
  </span>
)

class TopPage extends React.Component {
  constructor(props) {
    super(props)
    // decide initial tab index with URL props.slug
    let activeTabIndex = findIndex(props.boxes, box => box.slug === props.slug)
    if (activeTabIndex === -1) activeTabIndex = 0

    this.state = { tabIndex: activeTabIndex, mainHeight: 0 }
  }

  componentDidMount() {
    // this.setContentsHeight()
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

  // 現在アクティブになってるタブのslugをみて、penを出すか決める
  isShowPenIcon() {
    const curSlug = this.props.boxes[this.state.tabIndex].slug
    return curSlug === URL.TALK_SLUG
  }

  // tabIndex
  handleChange = (event, tabIndex) => {
    Router.replaceRoute(`${URL.VIEW_HOME}/${this.props.boxes[tabIndex].slug}`)
    this.setState({ tabIndex })
  }

  handleChangeIndex = tabIndex => {
    Router.replaceRoute(`${URL.VIEW_HOME}/${this.props.boxes[tabIndex].slug}`)
    this.setState({ tabIndex })
  }

  // 引数のindexが現在のActiveTabIndexと一致すればtrue
  isActive(targetTabIndex) {
    return targetTabIndex === this.state.tabIndex
  }

  render() {
    const props = this.props

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
              onChange={this.handleChange}
              TabIndicatorProps={{ style: this.getIndicatorStyle() }}
              // fullWidth
              scrollable
              scrollButtons="off"
            >
              {props.boxes.map((box, i) => (
                <Tab
                  key={i}
                  label={<Label text={box.header.text} />}
                  className={`tab`}
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
          >
            <TalkRoomContents disabled={!this.isActive(BoxType.index.talk)} />
            <VoiceContents disabled={!this.isActive(BoxType.index.voice)} />
            <NewsContents disabled={!this.isActive(BoxType.index.news)} />
          </SwipeableViews>

          {this.isShowPenIcon() ? (
            <FixedButton backgroundColor={props.color.backgroundColor} />
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
            width: 120px;
            outline: none !important;
          }

          .react-swipeable-view-container > div[aria-hidden='false'] {
            min-height: 300px;
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
export default connect(state => ({
  boxes: objectPath.get(state.site, `${PATH_MAP.BOXES}.item`),
  color: objectPath.get(state.site, `${PATH_MAP.COLOR}`)
}))(TopPage)
