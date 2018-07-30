import React from 'react'
import { connect } from 'react-redux'
// import { createAction } from 'redux-actions'
// import { Link, Router } from 'routes'
import BorderedTextHeader from 'components/organisms/site/BorderedTextHeader'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'
import { AppNotification } from 'constants/ActionTypes'
// import URL from 'constants/URL'

const Contents = props => {
  const mapped = props.boxContents.map((c, i) => <div key={i}>HELLO</div>)
  return mapped
}

class Notification extends React.Component {
  // static async getInitialProps({ ctx }) {
  //   return {}
  // }

  render() {
    const { boxContents } = this.props

    return (
      <React.Fragment>
        <BorderedTextHeader text="通知" />

        <InfiniteScroll
          disabled={false}
          action={AppNotification.FETCH_REQUEST}
          length={boxContents.length}
        >
          <Contents boxContents={boxContents} />
        </InfiniteScroll>

        <style jsx>{`
          .avatar i {
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  boxContents: state.app.notification.boxContents
}))(Notification)
