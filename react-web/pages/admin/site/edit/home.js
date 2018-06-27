import React from 'react'
import { connect } from 'react-redux'
import withAdminEdit from 'components/templates/withAdminEdit'
const Edit = withAdminEdit(<React.Fragment />)

class EditHome extends React.Component {
  // ?edit=true is added when the page is edit mode
  static async getInitialProps({ ctx }) {
    const { edit, slug } = ctx.query
    return { edit: !!edit, slug: `/${slug}` || '' }
  }

  render() {
    const props = this.props
    console.log(props)
    return <Edit {...props} iframeSrc={`/view/home${props.slug}?edit=true`} />
  }
}

export default connect(state => ({
  preview: state.site.preview,
  site: state.site
}))(EditHome)
