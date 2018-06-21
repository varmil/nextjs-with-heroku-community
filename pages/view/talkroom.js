import React from 'react'
import { connect } from 'react-redux'
import TalkRoomPage from 'components/templates/site/page/TalkRoomPage'
import PageDescription from 'components/organisms/site/base/PageDescription'
import PreInputForm from 'components/organisms/site/base/PreInputForm'
import CategorySelect from 'components/organisms/site/base/CategorySelect'

class TalkRoom extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TalkRoomPage
          {...this.props}
          pageDescription={PageDescription}
          preInputForm={PreInputForm}
          categorySelect={CategorySelect}
        />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  top: state.site.top,
  talkroom: state.site.talkroom
}))(TalkRoom)
