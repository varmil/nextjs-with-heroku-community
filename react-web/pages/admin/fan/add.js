import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { AppAdminFan } from 'constants/ActionTypes'
import {
  Container,
  Header,
  Filter
} from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import FanTable from 'components/organisms/admin/FanTable'

class AdminFanList extends React.Component {
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

  handleChange = value => {
    console.log(value)
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">ファン</li>
          <li className="breadcrumb-item active">ファンの追加</li>
        </WhiteBreadcrumb>

        <Container>
          <Header
            title="ファンの追加"
            route="/admin/fan/invite"
            buttonText="招待リンクを発行"
          />

          <Filter onChange={this.handleChange.bind(this)} />

          <section className="regNote mt-3 text-center">
            <FanTable
              fans={props.fans.item}
              count={props.fans.count}
              page={props.pageNum}
              rowsPerPage={props.perPage}
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
  fans: state.app.fans
}))(AdminFanList)
