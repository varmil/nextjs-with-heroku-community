import React from 'react'
import { connect } from 'react-redux'
import Edit from 'components/templates/Edit'
import TopPage from 'components/templates/edit_view_shared/TopPage'
import MainBanner from 'components/organisms/site/edit/MainBanner'
import BoxHeader from 'components/organisms/site/edit/BoxHeader'
import SubBanner from 'components/organisms/site/edit/SubBanner'

class EditTop extends React.Component {
  render() {
    return (
      <Edit>
        <TopPage
          {...this.props}
          edit={true}
          mainBanner={MainBanner}
          boxHeader={BoxHeader}
          subBanner={SubBanner}
        />
      </Edit>
    )
  }
}

export default connect(state => ({
  preview: state.site.preview,
  common: state.site.common,
  top: state.site.top
}))(EditTop)
