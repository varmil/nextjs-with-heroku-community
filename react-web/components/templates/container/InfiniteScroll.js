import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import InfiniteScroll from 'react-infinite-scroller'

// NOTE: pageStartはstoreの状態によってかわる
// ex) 記事詳細から戻ってきたときに初期化されてはならない。

class InfiniteContents extends React.Component {
  state = {
    hasMore: true,
    isLoading: false
  }

  // https://github.com/CassetteRocks/react-infinite-scroller/issues/143
  // 引数が怪しいのでtwiceロードしないように注意
  loadMoreRows(page) {
    console.info('loadMoreRows props::', this.props)
    console.info('loadMoreRows page::', page, this.state)
    this.setState({ ...this.state, isLoading: true })

    const successCb = res => {
      // set no more load flag if response is null
      this.setState({
        ...this.state,
        hasMore: Array.isArray(res.data) && res.data.length > 0,
        isLoading: false
      })
    }
    // BOXにあったコンテンツをFETCH
    this.props.dispatch(
      createAction(this.props.action)({
        pageNum: page,
        released: true,
        successCb
      })
    )
  }

  render() {
    return (
      <InfiniteScroll
        useWindow={false}
        initialLoad={true}
        pageStart={Math.ceil(this.props.length / 2)}
        loadMore={this.loadMoreRows.bind(this)}
        hasMore={!this.state.isLoading && this.state.hasMore}
        threshold={130}
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
