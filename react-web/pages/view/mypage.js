import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import chunk from 'lodash/chunk'
import IconButton from '@material-ui/core/IconButton'
import { Link, Router } from 'routes'
import Avatar from 'components/atoms/Avatar'
import BadgeSlick, { SimpleSlider } from 'components/molecules/BadgeSlick'
import MypageContents from 'components/templates/edit_view_shared/MypageContents'
import { AppMypage, AppBadge } from 'constants/ActionTypes'
import URL from 'constants/URL'

const DEFAULT_ICON_PATH = '/static/img/icon/usericon_default.png'
const BADGES_PER_PAGE = 8

const iconButtonStyle = {
  position: 'absolute',
  left: '3%',
  top: '0px'
}

class Mypage extends React.Component {
  static async getInitialProps({ ctx }) {
    const { userId } = ctx.query || {}
    return { userId }
  }

  constructor(props) {
    super(props)
    const { dispatch, userId } = props
    // このタイミングじゃないとprops.meが取得できないので
    this.isMe = !userId || +userId === props.me.id
    // console.log('CONST this is me', this.isMe)

    // 他人のデータはFETCHしないといけない。自分のならstoreにすでにある。
    if (!this.isMe) {
      dispatch(
        createAction(AppMypage.FETCH_OTHER_USER_REQUEST)({
          userId: +userId,
          action: AppMypage.SET_OTHER_USER
        })
      )
    }

    const param = this.isMe ? {} : { userId: +userId }
    dispatch(createAction(AppBadge.FETCH_LIST_REQUEST)(param))
  }

  render() {
    const props = this.props
    const userInfo = this.isMe ? props.me : props.user
    const chunks = chunk(props.badges, BADGES_PER_PAGE)

    return (
      <React.Fragment>
        <Head>
          <title>Mypage</title>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>

        <div className="container">
          <section className="avatar mt-4 text-center">
            <Avatar src={userInfo.iconPath || DEFAULT_ICON_PATH} size={60} />

            <Link route={URL.VIEW_HOME}>
              <IconButton style={iconButtonStyle}>
                <i className="fas fa-chevron-left" />
              </IconButton>
            </Link>
          </section>

          <section className="name mt-2 text-center">
            <span>{userInfo.nickname || 'スタッフ'}</span>

            {this.isMe && (
              <Link route={'/view/settings/account'}>
                <div className="edit">編集</div>
              </Link>
            )}
          </section>

          <section className="desc mt-4 px-4 text-center">
            {userInfo.introduction}
          </section>

          {/* <section className="act mt-4 row justify-content-center">
            <div className="entity text-center">
              <div className="n">140</div>
              <div className="d">投稿</div>
            </div>
            <div className="entity text-center">
              <div className="n">140</div>
              <div className="d">いいね!</div>
            </div>
            <div className="entity text-center">
              <div className="n">24k</div>
              <div className="d">コメント</div>
            </div>
          </section> */}

          <section className="badges position-relative mt-3">
            {this.isMe && (
              <Link route={'/view/badge'}>
                <div className="badgeLink">詳しく見る</div>
              </Link>
            )}

            <SimpleSlider className="pt-4 mb-4">
              {chunks.map((chunk, i) => <BadgeSlick key={i} chunk={chunk} />)}
            </SimpleSlider>
          </section>
        </div>

        <section>
          <MypageContents />
        </section>

        <style jsx>{`
          .avatar i {
            font-size: 22px;
          }

          .avatar,
          .name {
            position: relative;
          }

          .name span {
            position: relative;
            font-size: 22px;
            font-weight: bold;
            color: #2b6eb2;
          }

          .edit {
            color: #909090;
            position: absolute;
            bottom: 0px;
            right: 10%;
            font-size: 11px;
          }

          .badgeLink {
            color: #909090;
            position: absolute;
            top: 5px;
            right: 10%;
            font-size: 11px;
            z-index: 1;
          }

          .desc {
            font-weight: bold;
            font-size: 14px;
          }

          .act .n {
            font-weight: bold;
            font-size: 20px;
          }

          .act .d {
            font-size: 12px;
          }

          .act .entity {
            width: 80px;
          }

          .act .entity:not(:last-child) {
            border-right: 1px solid black;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  me: state.user,
  user: state.app.otherFanInfo,
  badges: state.app.badge.item
}))(Mypage)
