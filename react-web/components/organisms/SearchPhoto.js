import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { AppSearch } from 'constants/ActionTypes'
import objectPath from 'object-path'
import IconButton from '@material-ui/core/IconButton'
import ReadMoreAndLoading from 'components/molecules/ReadMoreAndLoading'
import { PreviewImage } from 'components/organisms/site/Photos'

const INITIAL_PAGE = 1
// クライアント側で強引に初期表示を絞る
const INITIAL_NUM = 4
const PER_PAGE = 4

class SearchPhoto extends React.Component {
  state = { nextPageNum: INITIAL_PAGE, hasMore: true, nowLoading: false }

  componentDidMount() {
    this.loadPage(INITIAL_PAGE)
  }

  loadPage(pageNum) {
    const { dispatch, word } = this.props
    const { nowLoading } = this.state
    console.log('next pageNum', pageNum, this.state)

    if (nowLoading) return
    this.setState({ ...this.state, nowLoading: true })

    const successCb = res => {
      // 結果配列が埋まっていれば、hasMoreをたてる
      this.setState({
        ...this.state,
        nextPageNum: pageNum + 1,
        hasMore: this.hasMore(pageNum, res.data),
        nowLoading: false
      })
    }
    dispatch(
      createAction(AppSearch.FETCH_REQUEST)({
        pageNum,
        perPage: PER_PAGE,
        successCb,
        fetchOption: { word, onlyPhoto: true }
      })
    )
  }

  // 次ページ読み込み
  onClickLoad = () => {
    this.loadPage(this.state.nextPageNum)
  }

  hasMore(currentPage, data) {
    // 引数（サーバからの返り値）を見て判断
    if (Array.isArray(data) && data.length > 0) {
      return true
    }
    return false
  }

  // 初期状態時のみ表示上限４枚にする
  sliceIfNeeded() {
    const { photos } = this.props
    const { nextPageNum } = this.state
    if (nextPageNum === INITIAL_PAGE + 1) return photos.slice(0, INITIAL_NUM)
    return photos
  }

  render() {
    const { photos } = this.props
    const { nowLoading, hasMore } = this.state

    return (
      <React.Fragment>
        <section className="header">
          <div className="row">
            {this.sliceIfNeeded(photos).map((e, i) => (
              <div key={i} className="col-6 px-1">
                <PreviewImage
                  route={`/view/post/${e.boxType}/${e.id}`}
                  src={e.photo}
                  index={e.index}
                />
              </div>
            ))}
          </div>

          <ReadMoreAndLoading
            text={'もっとみる'}
            nowLoading={nowLoading}
            hasMore={hasMore}
            onClick={this.onClickLoad}
          />
        </section>
        <style jsx>{`
          .header {
          }
        `}</style>
      </React.Fragment>
    )
  }
}
export default connect(state => ({
  photos: state.app.search.photos
}))(SearchPhoto)
