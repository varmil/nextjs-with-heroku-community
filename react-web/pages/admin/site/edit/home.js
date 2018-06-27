import React from 'react'
import { connect } from 'react-redux'
import withAdminEdit from 'components/templates/withAdminEdit'

// TODO: ヘッダ部分は外出しして、このEditHomeに移動させる
// あくまでこのHOCはsite編集の部分のみを扱う感じ
const Edit = withAdminEdit(<React.Fragment />)

class EditHome extends React.Component {
  static async getInitialProps({ ctx }) {
    const { slug } = ctx.query
    return { slug: `/${slug}` || '' }
  }

  render() {
    const props = this.props
    return <Edit {...props} iframeSrc={`/view/home${props.slug}?edit=true`} />
  }
}

export default connect(state => ({
  preview: state.site.preview,
  site: state.site
}))(EditHome)
