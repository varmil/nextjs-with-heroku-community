import React from 'react'
import { connect } from 'react-redux'
// import objectPath from 'object-path'
// import { PATH_MAP } from 'reducers/site'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import BoxContent from 'components/organisms/site/BoxContent'

class NewsContents extends BoxContents {
  constructor(props) {
    super(props)

    // HOCっぽくカスタム
    this.BoxContent = props => (
      <React.Fragment>
        <BoxContent {...props} topPhoto vote />
      </React.Fragment>
    )
  }

  render() {
    return <React.Fragment>{super.render()}</React.Fragment>
  }
}

export default connect(state => ({
  // TALK BOX由来のページでは共通して使う。
  pageData: state.site.voice,
  boxContents: state.app.voice.boxContents
}))(NewsContents)
