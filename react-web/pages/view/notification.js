import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
// import { Link, Router } from 'routes'
import BorderedTextHeader from 'components/organisms/site/BorderedTextHeader'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'
import { AppNotification } from 'constants/ActionTypes'
// import URL from 'constants/URL'
import Rule from '/../shared/constants/Rule'

const Contents = props => {
  const NotificationTypeToStr = type => {
    switch (type) {
      case Rule.NOTIFICATION_TYPE.Like:
        return 'いいね！'
      case Rule.NOTIFICATION_TYPE.Comment:
        return 'コメント'
      case Rule.NOTIFICATION_TYPE.Mention:
        return 'メンション' // TODO: ラベルの再考慮
      default:
        return ''
    }
  }

  // actionCountは総数なので、firstUser分をマイナスする
  const actionCountToStr = c => {
    const countOfFirstUserExcluded = c - 1
    if (!countOfFirstUserExcluded) return ''
    return `、他${countOfFirstUserExcluded}人`
  }

  const mapped = props.boxContents.map((c, i) => (
    <React.Fragment key={i}>
      <section className="wrap p-3 mx-3 my-3">
        <div className="row">
          <div className="b col-8">
            {c.firstUsername}さん{actionCountToStr(c.actionCount)}が「{c.title}」に
            {NotificationTypeToStr(c.type)}しました
          </div>
          <div className="time col-4">{c.createdAt}</div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          background-color: #f0f0f0;
        }

        .b {
          font-weight: bold;
          font-size: 14px;
        }

        .time {
          font-size: 13px;

          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </React.Fragment>
  ))
  return mapped
}

class Notification extends React.Component {
  // static async getInitialProps({ ctx }) {
  //   return {}
  // }

  componentDidMount() {
    // とりあえずこのページ開いたら既読に
    this.props.dispatch(createAction(AppNotification.UPDATE_READ_REQUEST)())
  }

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
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  boxContents: state.app.notification.boxContents
}))(Notification)
