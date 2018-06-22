import React from 'react'
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

export default TalkRoom
