import React from 'react'
import { connect } from 'react-redux'
import { Router, Link } from 'routes'
import { createAction } from 'redux-actions'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
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
    const successCb = res => {
      dispatch(setSuccess())
      Router.pushRoute(`/admin/post/list`)
      cb()
    }
    const errCb = res => {
      cb()
    }
    this.props.dispatch(
      createAction(AppAdminPost.SAVE_REQUEST)({
        successCb,
        errCb,
        postId,
        boxType,
        ...state
      })
    )
  }

  // NOTE: いわゆるFactoryメソッド
  createContent(argBoxType) {
    const { boxType, post, boxes } = this.props
    switch (argBoxType) {
      case BoxType.index.talk:
      case BoxType.index.news:
        return (
          <BaseEditor
            // https://stackoverflow.com/a/48451229
            // use key to force remount when url changed
            key={boxType}
            post={post}
            boxes={boxes}
            boxType={boxType}
            categories={this.createCategories(boxType)}
            onSubmit={this.onSubmit.bind(this)}
          />
        )

      case BoxType.index.voice:
        return (
          <VoiceEditor
            post={post}
            boxes={boxes}
            boxType={boxType}
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
  boxes: objectPath.get(state.site, `${PATH_MAP.BOXES}.item`),
  talkCategories: state.site.talk.categories.item,
  newsCategories: state.site.news.categories.item
}))(AdminPostAdd)
