import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import BoxContent from 'components/organisms/site/BoxContent'
import { AppPost } from 'constants/ActionTypes'
import BoxType from '/../shared/constants/BoxType'

// コメントする際にBottomに飛ばしたい
const BOTTOM_Y = 9999

// 汎用の記事詳細ページ
class Post extends React.Component {
  // boxTypeに応じてFETCHするBoxContentを変える
  // boxType, postId などは文字列なので注意
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    const { boxType } = ctx.query
    dispatch(createAction(AppPost.FETCH_REQUEST)(ctx.query))
    return { focus: !!ctx.query.focus, boxType: +boxType }
  }

  componentDidMount() {
    if (this.props.focus) {
      window.scrollTo(0, BOTTOM_Y)
    }
  }

  render() {
    const props = this.props
    const { data, comments } = props.post

    return (
      <React.Fragment>
        <BoxContent
          {...data}
          comments={comments}
          expandBody={true}
          showDetail={true}
          focus={props.focus}
        />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.app.post
}))(Post)
