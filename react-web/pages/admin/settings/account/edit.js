import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { AppAdminAccount } from 'constants/ActionTypes'
import { Container, Header } from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import AdminAccountTable from 'components/organisms/admin/AdminAccountTable'

class AdminAccountList extends React.Component {
  // 管理者はそんなに居ないだろうからページングなし
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    dispatch(createAction(AppAdminAccount.FETCH_LIST_REQUEST)())
    return {}
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">アカウント設定</li>
          <li className="breadcrumb-item active">管理者一覧</li>
        </WhiteBreadcrumb>

        <Container>
          <Header
            title="管理者情報"
            route="/admin/settings/account/add"
            buttonText="管理者の追加"
          />

          <section className="mt-3 text-center">
            <AdminAccountTable data={props.adminAccounts.item} />
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
