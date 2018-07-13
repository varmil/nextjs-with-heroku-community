import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import { createAction } from 'redux-actions'
import { AppAdminPost } from 'constants/ActionTypes'
import AdminPageContainer from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import ColorButton from 'components/atoms/ColorButton'
import FanTable from 'components/organisms/admin/FanTable'

class AdminFanList extends React.Component {
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    // one-start のページ番号
    const pageNum = +ctx.query.pageNum || 1
    // 1ページあたり記事数
    const PER_PAGE = 30

    dispatch(
      createAction(AppAdminPost.FETCH_LIST_REQUEST)({
        pageNum,
        perPage: PER_PAGE
      })
    )
    return { pageNum, perPage: PER_PAGE }
  }

  state = {
    keyword: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">ファン</li>
          <li className="breadcrumb-item active">一覧</li>
        </WhiteBreadcrumb>

        <AdminPageContainer>
          <section className="borderB pageHeader text-center position-relative pb-3">
            <span className="title">ファン一覧</span>
            <Link route={'/admin/fan/add'} passHref>
              <a>
                <ColorButton
                  className="addButton w-25"
                  color="#2b6db2"
                  style={{
                    position: 'absolute',
                    top: 3,
                    right: 0,
                    borderRadius: 18
                  }}
                  icon={<i className="fas fa-plus" />}
                >
                  ファンの追加
                </ColorButton>
              </a>
            </Link>
          </section>

          <section className="borderB py-4">
            <div className="search input-group text-right">
              <input
                type="text"
                className="form-control border-right-0"
                placeholder={`キーワードを検索`}
                value={this.state.keyword}
                onChange={this.handleChange('keyword')}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white border-left-0">
                  <i className="fas fa-search" />
                </span>
              </div>
            </div>
          </section>

          <section className="regNote mt-3 text-center">
            <FanTable
              fans={props.fans.item}
              count={props.fans.count}
              page={props.pageNum}
              rowsPerPage={props.perPage}
            />
          </section>
        </AdminPageContainer>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          .borderB {
            border-bottom: 1px solid gray;
          }

          .title {
            font-size: 38px;
          }

          .search {
            margin-left: auto;
            position: relative;
            top: 0;
            right: 0%;
            width: 30%;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  fans: state.app.fans
}))(AdminFanList)
