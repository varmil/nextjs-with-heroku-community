import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import Input from 'reactstrap/lib/Input'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import AdminPageContainer from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import ColorButton from 'components/atoms/ColorButton'
import SimpleTable from 'components/organisms/admin/SimpleTable'
import Rule from 'constants/Rule'

class AdminPostList extends React.Component {
  state = {
    keyword: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">投稿</li>
          <li className="breadcrumb-item active">一覧</li>
        </WhiteBreadcrumb>

        <AdminPageContainer>
          <section className="borderB pageHeader text-center position-relative pb-3">
            <span className="title">投稿</span>
            <Link route={'/admin/post/add'} passHref>
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
                  新規投稿
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

          {this.state.errorMessage && (
            <div className="alert alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
          )}

          <section className="regNote mt-3 text-center">
            <SimpleTable />
          </section>
        </AdminPageContainer>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          .container {
            background-color: white;
          }

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
  // post: state.site.post
}))(AdminPostList)
