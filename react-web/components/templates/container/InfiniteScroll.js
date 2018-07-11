import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import InfiniteScroll from 'react-infinite-scroller'
import LinearProgress from '@material-ui/core/LinearProgress'
// const timeout = ms => new Promise(res => setTimeout(res, ms))

// NOTE: pageStartはstoreの状態によってかわる
// ex) 記事詳細から戻ってきたときに初期化されてはならない。
const PER_PAGE = 5

class InfiniteContents extends React.Component {
  state = {
    hasMore: true,
    isLoading: false
  }

  // https://github.com/CassetteRocks/react-infinite-scroller/issues/143
  // 引数が怪しいのでtwiceロードしないように注意
  // action : ex) AppTalkRoom.FETCH_REQUEST
  async loadMoreRows(page) {
    // console.info('loadMoreRows props::', this.props)
    // console.info('loadMoreRows page::', page, this.state)
    const { dispatch, action } = this.props
    this.setState({ ...this.state, isLoading: true })

    const successCb = async res => {
      // set no more load flag if response is null
      this.setState({
        ...this.state,
        hasMore: Array.isArray(res.data) && res.data.length > 0,
        isLoading: false
      })
    }
    dispatch(
      createAction(action)({
        perPage: PER_PAGE,
        pageNum: page,
        released: true,
        successCb
      })
    )
  }

  render() {
    const { disabled } = this.props
    return (
      <InfiniteScroll
        useWindow={true}
        initialLoad={true}
        pageStart={Math.ceil(this.props.length / PER_PAGE)}
        loadMore={this.loadMoreRows.bind(this)}
        hasMore={!disabled && !this.state.isLoading && this.state.hasMore}
        threshold={250}
        loader={null}
      >
        {this.props.children}
        {this.state.isLoading && (
          <div className="text-center">
            <LinearProgress />
          </div>
        )}
      </InfiniteScroll>
    )
  }
}

export default connect()(InfiniteContents)
