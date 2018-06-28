import React from 'react'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import range from 'lodash/range'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { SiteTop, SiteTalkRoom, SiteNews } from 'constants/ActionTypes'
import { setSubBanner } from 'actions/site'
import FixedButton from 'components/atoms/FixedButton'
import Header from 'components/templates/container/Header'
import TalkRoomContents from 'components/templates/edit_view_shared/TalkRoomContents'
import NewsContents from 'components/templates/edit_view_shared/NewsContents'
import Classes from 'constants/Classes'
import URL from 'constants/URL'

const styles = {
  slide: {
    minHeight: 100
  },
  slide1: {},
  slide2: {},
  slide3: {}
}

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
    this.state = { tabIndex: activeTabIndex }
  }

  getIndicatorStyle() {
    return {
      backgroundColor: this.props.color.backgroundColor,
      height: 4
    }
  }

  createSubBanners() {
    const subBanner = this.props.top.subBanner
    return (
      <div className="">
        {range(subBanner.item.length).map(i => (
          <this.props.subBanner
            key={i}
            className="mb-2"
            contentState={subBanner.item[i].contentState}
            src={subBanner.item[i].src}
            backgroundColor={subBanner.item[i].backgroundColor}
            href={subBanner.item[i].href}
            onSave={state => this.onSaveSubBanner(state, i)}
          />
        ))}
      </div>
    )
  }

  // 現在アクティブになってるタブのslugをみて、penを出すか決める
  isShowPenIcon() {
    const curSlug = this.props.boxes[this.state.tabIndex].slug
    return curSlug === URL.TALK_SLUG
  }

  // tabIndex
  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex })
  }

  handleChangeIndex = index => {
    this.setState({ tabIndex: index })
  }

  /**
   * Edit Handler START
   */
  // onSaveBoxHeader(state, index) {
  //   this.props.dispatch(setBoxHeader({ ...state, index }))
  // }

  // Sub Banner
  onSaveSubBanner(state, index) {
    this.props.dispatch(setSubBanner({ ...state, index }))
  }

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <Header />

        <main>
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

          <SwipeableViews
            enableMouseEvents
            index={this.state.tabIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
              <TalkRoomContents
                pen={true}
                action={SiteTalkRoom.SET_CATEGORIES}
                propsPath={`${PATH_MAP.TALK_CATEGORIES}`}
              />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              slide n°2
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
              <NewsContents />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              slide n°4
            </div>
          </SwipeableViews>

          <div className="subBanner mt-3 mb-5">{this.createSubBanners()}</div>
        </main>

        {this.isShowPenIcon() ? (
          <FixedButton backgroundColor={props.color.backgroundColor} />
        ) : null}

        <style global jsx>{`
          ::-webkit-scrollbar {
            display: none;
          }

          .tab {
            width: 120px;
            outline: none !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

// export default withStyles(uiStyles)(TopPage)
// export default TopPage

export default connect(state => ({
  boxes: objectPath.get(state.site, `${PATH_MAP.BOXES}.item`),
  color: objectPath.get(state.site, `${PATH_MAP.COLOR}`)
}))(TopPage)
