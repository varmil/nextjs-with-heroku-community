import React from 'react'
import { connect } from 'react-redux'
import { AppSearch } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'

class SearchContents extends BoxContents {
  render() {
    const { boxContents, word } = this.props
    return (
      <React.Fragment>
        <InfiniteScroll
          key={word}
          disabled={false}
          action={AppSearch.FETCH_REQUEST}
          length={boxContents.length}
          fetchOption={{ word }}
        >
          {super.render()}
        </InfiniteScroll>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // TALK BOX由来のページでは共通して使う。
  boxContents: state.app.search.boxContents
}))(SearchContents)
