import React from 'react'
import { connect } from 'react-redux'
import TopPage from 'components/templates/site/page/TopPage'
import MainBanner from 'components/organisms/site/base/MainBanner'
import BoxHeader from 'components/organisms/site/base/BoxHeader'
import SubBanner from 'components/organisms/site/base/SubBanner'

class Top extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <TopPage
          {...props}
          mainBanner={MainBanner}
          boxHeader={BoxHeader}
          subBanner={SubBanner}
        />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  preview: state.site.preview,
  common: state.site.common,
  top: state.site.top
}))(Top)
