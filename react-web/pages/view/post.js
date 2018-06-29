import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import BoxContent from 'components/organisms/site/BoxContent'
import { SitePost } from 'constants/ActionTypes'

class Post extends React.Component {
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    // boxTypeに応じてFETCHするBoxContentを変える
    // boxType, postId などは文字列なので注意
    dispatch(createAction(SitePost.FETCH_REQUEST)(ctx.query))
    return {}
  }

  render() {
    const props = this.props
    const { data } = props.post
    return (
      <React.Fragment>
        <BoxContent {...data} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.site.post
}))(Post)
