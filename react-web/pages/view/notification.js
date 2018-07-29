import React from 'react'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Link, Router } from 'routes'
import BorderedTextHeader from 'components/organisms/site/BorderedTextHeader'
import MypageContents from 'components/templates/edit_view_shared/MypageContents'
import { AppMypage } from 'constants/ActionTypes'
import URL from 'constants/URL'

class Notification extends React.Component {
  // static async getInitialProps({ ctx }) {
  //   return {}
  // }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <BorderedTextHeader text="通知" />

        <div className="container">
          <section className="badges mt-2 row justify-content-center">
            {range(6).map(i => (
              <div key={i} className="badge col-3 py-2">
                <img src="/static/stub/badges/001.png" />
              </div>
            ))}
          </section>
        </div>

        <section>
          <MypageContents />
        </section>

        <style jsx>{`
          .avatar i {
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Notification)
