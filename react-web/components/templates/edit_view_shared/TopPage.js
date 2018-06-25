import React from 'react'
import range from 'lodash/range'
import SwipeableViews from 'react-swipeable-views'
import { setBoxHeader, setSubBanner } from 'actions/site'
import Header from 'components/templates/container/Header'
import TalkRoomContents from 'components/templates/edit_view_shared/TalkRoomContents'
import NewsContents from 'components/templates/edit_view_shared/NewsContents'

const initialState = {}

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

export default class TopPage extends React.Component {
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

    return (
      <React.Fragment>
        <Header edit={props.edit} mainBanner={props.mainBanner} />

        <main>
          <SwipeableViews enableMouseEvents>
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
      </React.Fragment>
    )
  }
}
