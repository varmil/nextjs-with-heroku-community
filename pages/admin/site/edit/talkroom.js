import React from 'react'
import { connect } from 'react-redux'
import Edit from 'components/templates/Edit'
import TalkRoomPage from 'components/templates/site/page/TalkRoomPage'
import CategorySelect from 'components/organisms/site/edit/CategorySelect'

class EditTalkRoom extends React.Component {
  render() {
    return (
      <Edit>
        <TalkRoomPage
          {...this.props}
          edit={true}
          categorySelect={CategorySelect}
        />
      </Edit>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  top: state.site.top,
  talkroom: state.site.talkroom
}))(EditTalkRoom)
