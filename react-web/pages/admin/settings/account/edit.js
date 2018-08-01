import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import { createAction } from 'redux-actions'
import { AppAdminAccount } from 'constants/ActionTypes'
import { Container, Header } from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import AdminEditForm from 'components/templates/admin/AdminEditForm'

class AdminAccountList extends React.Component {
  // 管理者はそんなに居ないだろうからページングなし
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    // dispatch(createAction(AppAdminAccount.FETCH_LIST_REQUEST)())
    return {}
  }

  onSave(state) {
    console.info('state', state)
    const successCb = async res => {
      Router.pushRoute(`/admin/settings/account/list`)
    }
    this.props.dispatch(
      createAction(User.AUTH_ADMIN_REQUEST)({
        ...state,
        successCb
      })
    )
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">アカウント設定</li>
          <li className="breadcrumb-item">管理者一覧</li>
          <li className="breadcrumb-item active">管理者情報詳細</li>
        </WhiteBreadcrumb>

        <Container style={{ maxWidth: 650 }}>
          <section className="mt-3">
            <AdminEditForm onSave={this.onSave.bind(this)} />
          </section>
        </Container>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  adminAccounts: state.app.adminAccounts
}))(AdminAccountList)
