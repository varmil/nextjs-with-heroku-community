import React from 'react'
import { connect } from 'react-redux'
import { Router, Link } from 'routes'
import { createAction } from 'redux-actions'
import { AppAdminPost } from 'constants/ActionTypes'
import { setSuccess } from 'actions/application'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import BaseEditor from 'components/templates/admin_post_add/BaseEditor'
import VoiceEditor from 'components/templates/admin_post_add/VoiceEditor'
import BoxType from '/../shared/constants/BoxType'

class AdminPostAdd extends React.Component {
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store

    // 下書き考慮。postIdがあればfetch-set。なければstate初期化
    const postId = +ctx.query.postId
    if (postId) {
      dispatch(createAction(AppAdminPost.FETCH_REQUEST)({ postId }))
    } else {
      dispatch(createAction(AppAdminPost.SET)({}))
    }

    // TODO: 全ボックスのカテゴリをfetch-set

    return { boxType: +ctx.query.boxType, postId }
  }

  onSubmit(state, cb) {
    console.info(state, this.props.postId)
    const { dispatch, postId, boxType } = this.props
    const successCb = async res => {
      dispatch(setSuccess())
      Router.pushRoute(`/admin/post/list`)
      // TODO call cb even if not success
    }
    this.props.dispatch(
      createAction(AppAdminPost.SAVE_REQUEST)({
        successCb,
        postId,
        boxType,
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
            // https://stackoverflow.com/a/48451229
            // use key to force remount when url changed
            key={props.boxType}
            post={props.post}
            boxType={props.boxType}
            categories={this.createCategories(props.boxType)}
            onSubmit={this.onSubmit.bind(this)}
          />
        )

      case BoxType.index.voice:
        return (
          <VoiceEditor
            post={props.post}
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

        {this.createContent(props.boxType)}
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  post: state.app.post.data,
  talkCategories: state.site.talk.categories.item,
  newsCategories: state.site.news.categories.item
}))(AdminPostAdd)
