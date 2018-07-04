import React from 'react'
import { connect } from 'react-redux'
// import objectPath from 'object-path'
// import { PATH_MAP } from 'reducers/site'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'

class MypageContents extends BoxContents {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return <React.Fragment>{super.render()}</React.Fragment>
  }
}

export default connect(state => ({
  // TALK BOX由来のページでは共通して使う。
  boxContents: state.app.mypage.boxContents
}))(MypageContents)
