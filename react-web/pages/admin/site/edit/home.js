import React from 'react'
import { connect } from 'react-redux'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import withAdminEdit from 'components/templates/withAdminEdit'
import URL from 'constants/URL'

// あくまでこのHOCはsite編集の部分のみを扱う感じ
const Edit = withAdminEdit(<React.Fragment />)

class EditHome extends React.Component {
  static async getInitialProps({ ctx }) {
    const { slug, previewMode } = ctx.query
    return { slug: slug || '', previewMode }
  }

  render() {
    const props = this.props
    // スラッシュ入れないとNext.jsでは view/home/?edit=true の際にErrorになる
    const iframeSlug = props.slug ? `/${props.slug}` : ''
    return (
      <React.Fragment>
        <div className="fixed-top">
          <AdminHeader />

          <WhiteBreadcrumb>
            <li className="breadcrumb-item">サイトデザイン</li>
            <li className="breadcrumb-item active">{props.slug || 'ホーム'}</li>
          </WhiteBreadcrumb>
        </div>

        <Edit
          {...props}
          iframeSrc={`${URL.VIEW_HOME}${iframeSlug}?${
            props.previewMode ? '' : 'edit=true'
          }`}
        />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  preview: state.site.preview,
  site: state.site
}))(EditHome)
