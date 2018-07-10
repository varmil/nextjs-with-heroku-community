import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import InfiniteScroll from 'react-infinite-scroller'

class InfiniteContents extends React.Component {
  state = {
    isLoading: false
  }

  // https://github.com/CassetteRocks/react-infinite-scroller/issues/143
  // 引数が怪しいのでtwiceロードしないように注意
  loadMoreRows(page) {
    const { isLoading } = this.state
    console.info('loadMoreRows page::', page, this.state)

    this.setState({ ...this.state, isLoading: true })

    if (isLoading) {
      console.info('this page is already loaded, so do nothing', page)
      return
    }

    const successCb = res => {
      console.log('load complete')
      this.setState({ ...this.state, isLoading: false })
    }
    // BOXにあったコンテンツをFETCH
    this.props.dispatch(
      createAction(this.props.action)({
        pageNum: 1 || page,
        released: true,
        successCb
      })
    )
  }

  render() {
    return (
      <InfiniteScroll
        useWindow={false}
        initialLoad={false}
        pageStart={1}
        loadMore={this.loadMoreRows.bind(this)}
        // TODO true if next page is existing
        hasMore={!this.state.isLoading}
        threshold={100}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {this.props.children}
      </InfiniteScroll>
    )
  }
}

export default connect()(InfiniteContents)
