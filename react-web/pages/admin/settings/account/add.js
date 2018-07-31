import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { AppAdminFan } from 'constants/ActionTypes'
import { Container, Header } from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import RoundWideButton from 'components/atoms/RoundWideButton'
import Role from '/../shared/constants/Role'

class AdminAccountAdd extends React.Component {
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    // one-start のページ番号
    const pageNum = +ctx.query.pageNum || 1
    // 1ページあたり記事数
    const PER_PAGE = 30

    dispatch(
      createAction(AppAdminFan.FETCH_LIST_REQUEST)({
        pageNum,
        perPage: PER_PAGE
      })
    )
    return { pageNum, perPage: PER_PAGE }
  }

  state = { emails: [] }

  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    // console.log(`action: ${actionMeta.action}`)
    console.groupEnd()

    const emails = newValue.map(v => v.value)
    this.setState({ ...this.state, emails })
  }

  handleInputChange = (inputValue, actionMeta) => {}

  onSubmit = () => {
    console.log(this.state)
    const { emails } = this.state
    this.props.dispatch(
      createAction(AppAdminFan.SAVE_INVITATION_REQUEST)({
        emails
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
                />

                <select className="custom-select mb-2">
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
                <input className="form-check-input" type="checkbox" />
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
