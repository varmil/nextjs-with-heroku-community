import React from 'react'
import { connect } from 'react-redux'
import { AppSearch } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'
import isEmpty from 'lodash/isEmpty'
import SearchInput from 'components/organisms/SearchInput'
import SearchContents from 'components/templates/edit_view_shared/SearchContents'
import BoxType from '/../shared/constants/BoxType'

// 検索結果表示ページ
class SearchResult extends React.Component {
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    const { word } = ctx.query
    // InfiniteScrollをページ１に戻すためにRESET
    dispatch(createAction(AppSearch.RESET_CONTENTS)())
    return { word }
  }

  componentDidMount() {}

  render() {
    const { word } = this.props

    return (
      <React.Fragment>
        <SearchInput word={word} />
        Hello World
        <SearchContents word={word} />
        <style global jsx>{`
          body {
            background-color: #f0f0f0 !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // boxContents: state.app.search.boxContents
}))(SearchResult)
