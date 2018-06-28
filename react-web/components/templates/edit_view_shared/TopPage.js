import React from 'react'
import range from 'lodash/range'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { setBoxHeader, setSubBanner } from 'actions/site'
import FixedButton from 'components/atoms/FixedButton'
import Header from 'components/templates/container/Header'
import TalkRoomContents from 'components/templates/edit_view_shared/TalkRoomContents'
import NewsContents from 'components/templates/edit_view_shared/NewsContents'

const styles = {
  slide: {
    minHeight: 100
  },
  slide1: {},
  slide2: {},
  slide3: {}
}

const tabIndicatorStyle = {
  backgroundColor: 'red',
  height: 4
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
    this.setState({ tabIndex: index })
  }

  /**
   * Edit Handler START
   */
  onSaveBoxHeader(state, index) {
    this.props.dispatch(setBoxHeader({ ...state, index }))
  }

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
        <Header mainBanner={props.mainBanner} />

        <main>
          <section>
            <Tabs
              className="tabs"
              value={this.state.tabIndex}
              onChange={this.handleChange}
              TabIndicatorProps={{ style: tabIndicatorStyle }}
              // fullWidth
              scrollable
              scrollButtons="off"
            >
              <Tab label={<Label text={'TALK'} />} className="tab" />
              <Tab label={<Label text={'VOICE'} />} className="tab" />
              <Tab label={<Label text={'NEWS'} />} className="tab" />
              <Tab label={<Label text={'EVENT'} />} className="tab" />
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
export default TopPage
