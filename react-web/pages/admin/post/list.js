import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import Input from 'reactstrap/lib/Input'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import Rule from 'constants/Rule'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import ColorButton from 'components/atoms/ColorButton'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'

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
          <li className="breadcrumb-item">サイトデザイン</li>
          <li className="breadcrumb-item active">投稿</li>
        </WhiteBreadcrumb>

        <div className="container pt-4 mt-3">
          <section className="pageHeader text-center position-relative pb-3">
            <span className="title">投稿</span>

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
              新規登録
            </ColorButton>
          </section>

          <section className="mt-3">
            <div className="form-group">
              <label>パスワード</label>
              <Input
                type="text"
                placeholder={`キーワードを検索`}
                value={this.state.keyword}
                onChange={this.handleChange('keyword')}
              />
            </div>
          </section>

          {this.state.errorMessage && (
            <div className="alert alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
          )}

          <section className="regNote mt-3 text-center">
            上のアカウント登録ボタンを押すことにより、<br />
            <a>利用規約</a> に同意したことになります。
          </section>
        </div>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          .container {
            background-color: white;
          }

          .pageHeader {
            border-bottom: 1px solid gray;
          }

          .title {
            font-size: 38px;
          }

          .alert {
            font-size: 12px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // post: state.site.post
}))(AdminPostList)
