import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { AppAdminPost } from 'constants/ActionTypes'
import {
  Container,
  Header,
  Filter
} from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import PostTable from 'components/organisms/admin/PostTable'

class AdminPostList extends React.Component {
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

  handleChange = value => {
    console.log(value)
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">投稿</li>
          <li className="breadcrumb-item active">一覧</li>
        </WhiteBreadcrumb>

        <Container>
          <Header
            title="投稿"
            route="/admin/post/add/0"
            buttonText="新規投稿"
          />

          <Filter onChange={this.handleChange.bind(this)} />

          <section className="regNote mt-3 text-center">
            <PostTable
              posts={props.posts.item}
              count={props.posts.count}
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
  posts: state.app.posts
}))(AdminPostList)
