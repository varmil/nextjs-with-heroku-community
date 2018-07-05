import React from 'react'
import { connect } from 'react-redux'
import { Router, Link } from 'routes'
import { withStyles } from '@material-ui/core/styles'
import { createAction } from 'redux-actions'
import { AppAdminPost } from 'constants/ActionTypes'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import BaseEditor from 'components/templates/admin_post_add/BaseEditor'
import VoiceEditor from 'components/templates/admin_post_add/VoiceEditor'
import BoxType from '/../shared/constants/BoxType'

class AdminPostAdd extends React.Component {
  static async getInitialProps({ ctx }) {
    // TODO: 下書き考慮

    // TODO: 全ボックスのカテゴリをfetchしてset

    return { boxType: +ctx.query.boxType }
  }

  state = {
    errorMessage: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSubmit(state) {
    console.info(state)
    const props = this.props
    const successCb = async res => Router.pushRoute(`/admin/post/list`)
    const errCb = async res => {
      this.setState({
        ...this.state,
        errorMessage: <span>{JSON.stringify(res.data)}</span>
      })
    }
    this.props.dispatch(
      createAction(AppAdminPost.SAVE_REQUEST)({
        successCb,
        errCb,
        boxType: props.boxType,
        ...state
      })
    )
  }

  // NOTE: いわゆるFactoryメソッド
  createContent(boxType) {
    const props = this.props
    switch (boxType) {
      case BoxType.index.talk:
      case BoxType.index.news:
        return (
          <BaseEditor
            boxType={props.boxType}
            categories={this.createCategories(props.boxType)}
            onSubmit={this.onSubmit.bind(this)}
          />
        )

      case BoxType.index.voice:
        return (
          <VoiceEditor
            boxType={props.boxType}
            onSubmit={this.onSubmit.bind(this)}
          />
        )
      default:
        return null
    }
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

        {this.state.errorMessage && (
          <div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
          </div>
        )}

        {this.createContent(props.boxType)}
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  talkCategories: state.site.talkroom.categories.item,
  newsCategories: state.site.news.categories.item
}))(AdminPostAdd)
