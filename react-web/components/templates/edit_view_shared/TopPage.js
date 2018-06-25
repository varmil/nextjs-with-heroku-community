import React from 'react'
import range from 'lodash/range'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { setBoxHeader, setSubBanner } from 'actions/site'
import Header from 'components/templates/container/Header'
import TalkRoomContents from 'components/templates/edit_view_shared/TalkRoomContents'
import NewsContents from 'components/templates/edit_view_shared/NewsContents'

const styles = {
  slide: {
    // padding: 15,
    minHeight: 100
    // color: '#fff'
  },
  slide1: {
    // background: '#F5F5F5'
  },
  slide2: {
    // background: '#F5F5F5'
  },
  slide3: {
    // background: '#F5F5F5'
  }
}

const tabIndicatorStyle = {
  backgroundColor: '#333',
  height: 5
}

class TopPage extends React.Component {
  constructor(props) {
    super(props)

    // TODO: decide initial tab index with URL props.slug
    this.state = { tabIndex: 0 }
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

  // tabIndex
  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex })
  }

  handleChangeIndex = index => {
    console.log('change index', index)
    this.setState({ tabIndex: index })
  }

  /**
   * Edit Handler START
   */
  onSaveBoxHeader(state, index) {
    this.props.dispatch(setBoxHeader({ ...state, index }))
  }

  // Main Banner
  // onSaveMainBanner(state, index) {
  //   this.props.dispatch(setMainBanner({ ...state, index }))
  // }

  // Sub Banner
  onSaveSubBanner(state, index) {
    this.props.dispatch(setSubBanner({ ...state, index }))
  }

  // onSaveFooter(state) {
  //   this.props.dispatch(setFooter(state))
  // }

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props
    console.log('[TOP PAGE]', props)

    return (
      <React.Fragment>
        <Header edit={props.edit} mainBanner={props.mainBanner} />

        <main>
          <section>
            <Tabs
              value={this.state.tabIndex}
              onChange={this.handleChange}
              TabIndicatorProps={{ style: tabIndicatorStyle }}
              fullWidth
              scrollable
              scrollButtons="off"
            >
              <Tab label="TALK" className="outline-none" />
              <Tab label="VOICE" className="outline-none" />
              <Tab label="NEWS" className="outline-none" />
              <Tab label="EVENT" className="outline-none" />
            </Tabs>
          </section>

          <SwipeableViews
            enableMouseEvents
            index={this.state.tabIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
              <TalkRoomContents categorySelect={props.categorySelect} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              slide n°2
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
              <NewsContents categorySelect={props.categorySelect} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              slide n°4
            </div>
          </SwipeableViews>

          <div className="subBanner mt-3 mb-5">{this.createSubBanners()}</div>
        </main>

        <style global jsx>{`
          .outline-none {
            outline: none !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

// export default withStyles(uiStyles)(TopPage)
export default TopPage
