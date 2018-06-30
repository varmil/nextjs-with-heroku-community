import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import BoxContent from 'components/organisms/site/BoxContent'
import { AppPost } from 'constants/ActionTypes'

// コメントする際にBottomに飛ばしたい
const BOTTOM_Y = 9999

class Post extends React.Component {
  // boxTypeに応じてFETCHするBoxContentを変える
  // boxType, postId などは文字列なので注意
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    dispatch(createAction(AppPost.FETCH_REQUEST)(ctx.query))
    return { focus: !!ctx.query.focus }
  }

  componentDidMount() {
    if (this.props.focus) {
      window.scrollTo(0, BOTTOM_Y)
    }
  }

  render() {
    const props = this.props
    const { data } = props.post
    return (
      <React.Fragment>
        <BoxContent
          {...data}
          expandBody={true}
          showDetail={true}
          expandComment={true}
          focus={props.focus}
        />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.app.post
}))(Post)
