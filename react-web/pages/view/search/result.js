import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import SearchContents from 'components/templates/edit_view_shared/SearchContents'
import BoxType from '/../shared/constants/BoxType'

// 検索結果表示ページ
class SearchResult extends React.Component {
  static async getInitialProps({ ctx }) {
    // console.log(ctx.query)
    // const { dispatch } = ctx.store
    // dispatch(createAction(AppSearch.FETCH_REQUEST)(word))
    const { word } = ctx.query
    return { word }
  }

  componentDidMount() {}

  render() {
    const { word } = this.props

    return (
      <React.Fragment>
        Hello World
        <SearchContents word={word} />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // boxContents: state.app.search.boxContents
}))(SearchResult)
