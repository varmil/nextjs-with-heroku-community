import React from 'react'
import range from 'lodash/range'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { setBoxHeader, setSubBanner } from 'actions/site'
import Header from 'components/templates/container/Header'
import TalkRoomContents from 'components/templates/edit_view_shared/TalkRoomContents'
import NewsContents from 'components/templates/edit_view_shared/NewsContents'

const initialState = { tabIndex: 0 }

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff'
  },
  slide1: {
    background: '#FEA900'
  },
  slide2: {
    background: '#B3DC4A'
  },
  slide3: {
    background: '#6AC0FF'
  }
}

class TopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
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
              TabIndicatorProps={{ style: { backgroundColor: '#333' } }}
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
