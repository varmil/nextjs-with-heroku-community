import React from 'react'
import { connect } from 'react-redux'
import withAdminEdit from 'components/templates/withAdminEdit'

// TODO: ヘッダ部分は外出しして、このEditに移動させる
// あくまでこのHOCはsite編集の部分のみを扱う感じ
const Edit = withAdminEdit(<React.Fragment />)

class EditWelcome extends React.Component {
  render() {
    return <Edit {...this.props} iframeSrc={`/view/welcome?edit=true`} />
  }
}

export default connect(state => ({
  preview: state.site.preview,
  site: state.site
}))(EditWelcome)
