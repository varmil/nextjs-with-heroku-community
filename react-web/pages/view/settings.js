import React from 'react'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Link, Router } from 'routes'
import { deauthenticate } from 'actions/user'
import BorderedTextHeader from 'components/organisms/site/BorderedTextHeader'

const LinkOrDiv = props =>
  props.route ? (
    <Link route={props.route} passHref>
      {props.children}
    </Link>
  ) : (
    <div>{props.children}</div>
  )

const Item = props => (
  <LinkOrDiv route={props.to}>
    <div
      className={`row ${props.className || ''}`}
      onClick={props.onClick || (() => {})}
    >
      <div className="col-9">{props.children}</div>
      <div className="col-2">
        <i className="fas fa-chevron-right" />
      </div>

      <style jsx>{`
        .row {
          font-size: 17px;
          font-weight: bold;
          color: #4b4b4b;
        }
      `}</style>
    </div>
  </LinkOrDiv>
)

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
            <Item to="/view/settings/account" className="my-4">
              アカウント設定
            </Item>
            <Item className="my-4">お問い合わせ</Item>
            <Item className="my-4">会員規約</Item>
            <Item className="my-4">プライバシーポリシー</Item>
            <Item
              className="my-4"
              onClick={() => {
                props.dispatch(deauthenticate())
              }}
            >
              ログアウト
            </Item>
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
