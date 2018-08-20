import React from 'react'
import { connect } from 'react-redux'
import { Router, Link } from 'routes'
import { createAction } from 'redux-actions'
import { User, AppAdminAccount } from 'constants/ActionTypes'
import { Container } from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import AdminEditForm from 'components/templates/admin/AdminEditForm'
import Role from '/../shared/constants/Role'

class AdminAccountList extends React.Component {
  // 既存情報FETCH
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    const { userId } = ctx.query

    // userIdがなければ自分のページ、あればそのユーザのページ
    dispatch(
      createAction(AppAdminAccount.FETCH_OTHER_ADMIN_REQUEST)({
        userId,
        action: AppAdminAccount.SET_OTHER_ADMIN
      })
    )

    return { userId }
  }

  onSave(state) {
    console.info('state', state)
    const { user } = this.props

    const successCb = async res => {
      Router.pushRoute(`/admin/settings/account/list`)
    }
    this.props.dispatch(
      createAction(User.SAVE_PROFILE_REQUEST)({
        successCb,
        // userIdは更新対象者のID（undefinedなら自分）
        // 面倒なので全部渡してSAGAでフィルタリングする
        data: { ...state, userId: user.id }
      })
    )
  }

  render() {
    // userは編集対象。meは自分自身
    const { me, user } = this.props
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
          <li className="breadcrumb-item active">管理者情報詳細</li>
        </WhiteBreadcrumb>

        <Container style={{ maxWidth: 650 }}>
          <section className="mt-3">
            <AdminEditForm
              onSave={this.onSave.bind(this)}
              iconPath={user.iconPath}
              brandName={user.brand.name}
              brandNameDisabled
              lastName={user.lastName}
              firstName={user.firstName}
              email={user.email}
              // SUPER管理者以外は権限変更不可能
              roleId={user.roleId}
              roleIdDisabled={me.roleId !== Role.User.ADMIN_SUPER}
            />
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
  me: state.user,
  user: state.app.otherAdminInfo
}))(AdminAccountList)
