import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import { withStyles } from '@material-ui/core/styles'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import BaseEditor from 'components/templates/admin_post_add/BaseEditor'
import BoxType from '/../shared/constants/BoxType'

class AdminPostAdd extends React.Component {
  static async getInitialProps({ ctx }) {
    // TODO: 全ボックスのカテゴリをfetchしてset

    return { boxType: +ctx.query.boxType }
  }

  state = {
    title: '',
    body: '',
    files: []
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  // NOTE: ボックスタイプが増えるたびにここも修正する必要あり
  createCategories(boxType) {
    const props = this.props
    switch (boxType) {
      case BoxType.index.talk:
        return props.talkCategories.filter(e => e.text)
      case BoxType.index.news:
        return props.newsCategories.filter(e => e.text)
      default:
        return null
    }
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">投稿</li>
        </WhiteBreadcrumb>

        <BaseEditor
          boxType={props.boxType}
          categories={this.createCategories(props.boxType)}
        />
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  talkCategories: state.site.talkroom.categories.item,
  newsCategories: state.site.news.categories.item
}))(AdminPostAdd)
