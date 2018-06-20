import React from 'react'
import { connect } from 'react-redux'
import Edit from 'components/templates/Edit'
import TopPage from 'components/templates/site/page/TopPage'

class EditTop extends React.Component {
  render() {
    return (
      <Edit>
        <TopPage {...this.props} edit={true} />
      </Edit>
    )
  }
}

export default connect(state => ({
  preview: state.site.preview,
  common: state.site.common,
  top: state.site.top
}))(EditTop)
