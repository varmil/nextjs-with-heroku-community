import React from 'react'
import { connect } from 'react-redux'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import withAdminEdit from 'components/templates/withAdminEdit'

// あくまでこのHOCはsite編集の部分のみを扱う感じ
const Edit = withAdminEdit(<React.Fragment />)

class EditWelcome extends React.Component {
  static async getInitialProps({ ctx }) {
    // const { dispatch } = ctx.store
    return {}
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="fixed-top">
          <AdminHeader />

          <WhiteBreadcrumb>
            <li className="breadcrumb-item">サイトデザイン</li>
            <li className="breadcrumb-item active">{'Welcome'}</li>
          </WhiteBreadcrumb>
        </div>

        <Edit {...this.props} iframeSrc={`/view/welcome?edit=true`} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  preview: state.site.preview,
  site: state.site
}))(EditWelcome)
