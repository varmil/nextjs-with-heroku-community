import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Router, Link } from 'routes'
import { AppAdminAccount } from 'constants/ActionTypes'
import { Container, Header } from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import RoundWideButton from 'components/atoms/RoundWideButton'
import Role from '/../shared/constants/Role'

class AdminAccountAdd extends React.Component {
  state = { email: '', roleId: Role.User.ADMIN_GUEST, isNotified: false }

  handleChange = name => event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({ [name]: value })
  }

  onSubmit = () => {
    console.log(this.state)

    const successCb = async res => {
      Router.pushRoute(`/admin/settings/account/list`)
    }
    this.props.dispatch(
      createAction(AppAdminAccount.SAVE_REQUEST)({
        ...this.state,
        successCb
      })
    )
  }

  render() {
    const { email, roleId, isNotified } = this.state

    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <Link route={`/admin/settings`} passHref>
            <a className="breadcrumb-item">アカウント設定</a>
          </Link>
          <Link route={`/admin/settings/account/list`} passHref>
            <a className="breadcrumb-item">管理者一覧</a>
          </Link>
          <li className="breadcrumb-item active">管理者追加</li>
        </WhiteBreadcrumb>

        <Container>
          <Header title="管理者アカウント発行" />

          <section className="mt-5 mb-5 row justify-content-center">
            <div className="col-offset-2 col-8">
              <section className="form-inline">
                <input
                  type="email"
                  className="form-control mb-2 mr-2 w-50"
                  placeholder="メールアドレスを入力"
                  value={email}
                  onChange={this.handleChange('email')}
                />

                <select
                  className="custom-select mb-2"
                  value={roleId}
                  onChange={this.handleChange('roleId')}
                >
                  <option value={Role.User.ADMIN_GUEST}>
                    {Role.Name[Role.User.ADMIN_GUEST]}
                  </option>
                  <option value={Role.User.ADMIN_DEVELOPER}>
                    {Role.Name[Role.User.ADMIN_DEVELOPER]}
                  </option>
                  <option value={Role.User.ADMIN_SUPER}>
                    {Role.Name[Role.User.ADMIN_SUPER]}
                  </option>
                </select>
              </section>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isNotified}
                  onChange={this.handleChange('isNotified')}
                />
                <label className="form-check-label">メールで通知する</label>
              </div>
            </div>

            <div className="col-2">
              <RoundWideButton
                outline={false}
                containerStyle={{
                  position: 'relative'
                }}
                style={{
                  paddingTop: 7,
                  paddingBottom: 7,
                  fontSize: 14
                }}
                color={'#B2B2B2'}
                onClick={this.onSubmit}
              >
                発行
              </RoundWideButton>
            </div>
          </section>
        </Container>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          label {
            font-size: 13px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect()(AdminAccountAdd)
