import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import BoxContent from 'components/organisms/site/BoxContent'
import { AppPost } from 'constants/ActionTypes'
import BoxType from '/../shared/constants/BoxType'

// 検索結果表示ページ
class SearchResult extends React.Component {
  static async getInitialProps({ ctx }) {
    console.log(ctx.query)

    // const { dispatch } = ctx.store
    // const { boxType } = ctx.query
    // dispatch(createAction(AppPost.FETCH_REQUEST)(ctx.query))
    // return { focus: !!ctx.query.focus, boxType: +boxType }
  }

  componentDidMount() {}

  render() {
    const props = this.props

    return (
      <React.Fragment>
        Hello World
        {/* <BoxContent
          {...data}
          comments={comments}
          expandBody={true}
          showDetail={true}
          focus={props.focus}
        /> */}
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.app.post
}))(SearchResult)
