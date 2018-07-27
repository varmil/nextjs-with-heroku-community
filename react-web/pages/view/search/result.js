import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import SearchContents from 'components/templates/edit_view_shared/SearchContents'
import { AppSearch } from 'constants/ActionTypes'
import BoxType from '/../shared/constants/BoxType'

// 検索結果表示ページ
class SearchResult extends React.Component {
  static async getInitialProps({ ctx }) {
    console.log(ctx.query)
    // const { dispatch } = ctx.store
    // const { word } = ctx.query
    // dispatch(createAction(AppSearch.FETCH_REQUEST)(word))
    return {
      /* word */
    }
  }

  componentDidMount() {}

  render() {
    // const { boxContents } = this.props

    return (
      <React.Fragment>
        Hello World
        <SearchContents />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // boxContents: state.app.search.boxContents
}))(SearchResult)
