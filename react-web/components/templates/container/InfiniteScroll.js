import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import InfiniteScroll from 'react-infinite-scroller'
import LinearProgress from '@material-ui/core/LinearProgress'

// ex) 記事詳細から戻ってきたときに初期化されてはならない。
const PER_PAGE = 5

// const TalkInfiniteContents = props => (
//   <InfiniteContents
//     {...props}
//     fetchOption={{ ...props.fetchOption, categoryIndex: props.categoryIndex }}
//   />
// )

class InfiniteContents extends React.Component {
  state = {
    hasMore: true,
    isLoading: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // ロード中にこのコンポーネントがdisabledになったら、ローディング状態を解除
    if (prevState.isLoading && nextProps.disabled) {
      return { isLoading: false }
    }
    return null
  }

  // https://github.com/CassetteRocks/react-infinite-scroller/issues/143
  // 引数が怪しいのでtwiceロードしないように注意
  // action : ex) AppTalkRoom.FETCH_REQUEST
  loadMoreRows(page) {
    // console.info('loadMoreRows props::', this.props)
    // console.info('loadMoreRows page::', page, this.state)
    const { dispatch, action, fetchOption } = this.props
    this.setState({ ...this.state, isLoading: true })

    const successCb = res => {
      // 結果配列が埋まっていれば、hasMoreをたてる
      this.setState({
        ...this.state,
        hasMore: Array.isArray(res.data) && res.data.length === PER_PAGE,
        isLoading: false
      })
    }
    dispatch(
      createAction(action)({
        perPage: PER_PAGE,
        pageNum: page,
        released: true,
        successCb,
        fetchOption
      })
    )
  }

  render() {
    const { disabled } = this.props
    return (
      <InfiniteScroll
        useWindow={true}
        // クライアント側でロードさせる（SSRしない）
        initialLoad={true}
        // NOTE: pageStartはstoreの状態によってかわる
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
