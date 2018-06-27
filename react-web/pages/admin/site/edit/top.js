import React from 'react'
import { connect } from 'react-redux'
import withAdminEdit from 'components/templates/Edit'
import TopPage from 'components/templates/edit_view_shared/TopPage'
import MainBanner from 'components/organisms/site/edit/MainBanner'
import CategorySelect from 'components/organisms/site/edit/CategorySelect'
import SubBanner from 'components/organisms/site/edit/SubBanner'

class EditTop extends React.Component {
  render() {
    return (
      <TopPage
        {...this.props}
        edit={true}
        mainBanner={MainBanner}
        categorySelect={CategorySelect}
        subBanner={SubBanner}
      />
    )
  }
}

const composed = withAdminEdit(EditTop)
export default connect(state => ({
  preview: state.site.preview,
  site: state.site
}))(composed)
