import React from 'react'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Link, Router } from 'routes'
import { deauthenticate } from 'actions/user'
import BorderedTextHeader from 'components/organisms/site/BorderedTextHeader'

class Settings extends React.Component {
  // state = {
  //   email: '',
  //   password: '',
  //   errorMessage: ''
  // }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <BorderedTextHeader text="設定" />

        <div className="container">
          <section className="contentWrap mt-5 ml-4">
            <div
              className="text"
              onClick={() => {
                props.dispatch(deauthenticate())
              }}
            >
              ログアウト
            </div>
          </section>
        </div>

        <style jsx>{`
          .header span {
            font-size: 20px;
            font-weight: bold;
          }

          .avatar i {
            font-size: 22px;
          }

          .contentWrap {
            font-size: 16px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Settings)
