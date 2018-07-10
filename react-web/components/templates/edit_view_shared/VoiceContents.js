import React from 'react'
import { connect } from 'react-redux'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { AppVoice } from 'constants/ActionTypes'
import BoxContents from 'components/templates/edit_view_shared/BoxContents'
import BoxContent from 'components/organisms/site/BoxContent'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'

class NewsContents extends BoxContents {
  constructor(props) {
    super(props)

    // HOCっぽくカスタム
    this.BoxContent = originalProps => (
      <React.Fragment>
        <BoxContent
          {...originalProps}
          topPhoto
          goingVote
          voteButtonColor={props.color.backgroundColor}
        />
      </React.Fragment>
    )
  }

  render() {
    const { boxContents } = this.props
    return (
      <React.Fragment>
        <InfiniteScroll
          action={AppVoice.FETCH_REQUEST}
          length={boxContents.length}
        >
          {super.render()}
        </InfiniteScroll>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  color: objectPath.get(state.site, `${PATH_MAP.COLOR}`),

  // TALK BOX由来のページでは共通して使う。
  pageData: state.site.voice,
  boxContents: state.app.voice.boxContents
}))(NewsContents)
