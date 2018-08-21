import React from 'react'
import { connect } from 'react-redux'
import { AppMypage } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'

class MypageContents extends BoxContents {
  render() {
    const { boxContents, userId } = this.props
    return (
      <React.Fragment>
        <InfiniteScroll
          key={userId}
          disabled={false}
          action={AppMypage.FETCH_REQUEST}
          length={boxContents.length}
          fetchOption={{ userId }}
        >
          {super.render()}
        </InfiniteScroll>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // TALK BOX由来のページでは共通して使う。
  boxContents: state.app.mypage.boxContents
}))(MypageContents)
