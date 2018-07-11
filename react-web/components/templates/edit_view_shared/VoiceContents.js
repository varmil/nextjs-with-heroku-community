import React from 'react'
import { connect } from 'react-redux'
import { AppVoice } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'

class VoiceContents extends BoxContents {
  render() {
    const { boxContents, disabled } = this.props
    return (
      <React.Fragment>
        <InfiniteScroll
          disabled={disabled}
          action={AppVoice.FETCH_REQUEST}
          length={boxContents.length}
        >
          {super.render()}
        </InfiniteScroll>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // TALK BOX由来のページでは共通して使う。
  pageData: state.site.voice,
  boxContents: state.app.voice.boxContents
}))(VoiceContents)
