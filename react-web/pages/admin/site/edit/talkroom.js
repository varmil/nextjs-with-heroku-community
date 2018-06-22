import React from 'react'
import Edit from 'components/templates/Edit'
import TalkRoomPage from 'components/templates/site/page/TalkRoomPage'
import PageDescription from 'components/organisms/site/edit/PageDescription'
import PreInputForm from 'components/organisms/site/edit/PreInputForm'
import CategorySelect from 'components/organisms/site/edit/CategorySelect'

class EditTalkRoom extends React.Component {
  render() {
    return (
      <Edit>
        <TalkRoomPage
          {...this.props}
          edit={true}
          pageDescription={PageDescription}
          preInputForm={PreInputForm}
          categorySelect={CategorySelect}
        />
      </Edit>
    )
  }
}

export default EditTalkRoom
