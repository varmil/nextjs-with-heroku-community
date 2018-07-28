import React from 'react'
import { connect } from 'react-redux'
import { AppSearch } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'
import isEmpty from 'lodash/isEmpty'
import SearchInput from 'components/organisms/SearchInput'
import SearchPhoto from 'components/organisms/SearchPhoto'
import SearchContents from 'components/templates/edit_view_shared/SearchContents'
import BoxType from '/../shared/constants/BoxType'

// 検索結果表示ページ
class SearchResult extends React.Component {
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    const { word } = ctx.query

    // Photo, InfiniteScrollをページ１に戻すためにRESET
    dispatch(createAction(AppSearch.RESET_PHOTOS)())
    dispatch(createAction(AppSearch.RESET_CONTENTS)())

    return { word }
  }

  componentDidMount() {}

  render() {
    const { word } = this.props

    return (
      <React.Fragment>
        <SearchInput route={`/view/search/query`} word={word} />
        <SearchPhoto key={'P' + word} word={word} />
        <SearchContents key={'C' + word} word={word} />
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
