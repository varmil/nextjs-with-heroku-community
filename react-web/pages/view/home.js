import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import withIFrameable from 'components/templates/withIFrameable'
import TopPage from 'components/templates/edit_view_shared/TopPage'
import { SiteTalkRoom } from 'constants/ActionTypes'

const IFramedTop = withIFrameable(TopPage)

class Home extends React.Component {
  // ctx.query contains URL params
  // ?edit=true is added when the page is edit mode
  static async getInitialProps({ ctx }) {
    const { edit, slug } = ctx.query
    const { dispatch } = ctx.store

    // homeで使用するデータは全て事前にFETCHしないといけない。（NEWS, VOICE...）
    dispatch(createAction(SiteTalkRoom.FETCH_INITIAL_REQUEST)())
    return { edit: !!edit, slug: slug || '' }
  }

  componentWillMount() {
    this.TopPage = this.props.edit ? IFramedTop : TopPage
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <this.TopPage {...props} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  top: state.site.top
}))(Home)
