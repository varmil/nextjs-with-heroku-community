import React from 'react'
import { connect } from 'react-redux'
import TopPage from 'components/templates/site/page/TopPage'

class Top extends React.Component {
  static async getInitialProps(props) {}

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <TopPage {...props} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  preview: state.site.preview,
  common: state.site.common,
  top: state.site.top
}))(Top)
