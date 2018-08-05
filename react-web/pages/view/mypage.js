import React from 'react'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import IconButton from '@material-ui/core/IconButton'
import { Link, Router } from 'routes'
import Avatar from 'components/atoms/Avatar'
import MypageContents from 'components/templates/edit_view_shared/MypageContents'
import { AppMypage } from 'constants/ActionTypes'
import URL from 'constants/URL'

const iconButtonStyle = {
  position: 'absolute',
  left: '3%',
  top: '0px'
}

class Mypage extends React.Component {
  // static async getInitialProps({ ctx }) {
  //   return {}
  // }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="container">
          <section className="avatar mt-4 text-center">
            <Avatar src={props.user.iconPath} size={60} />

            <Link route={URL.VIEW_HOME}>
              <IconButton style={iconButtonStyle}>
                <i className="fas fa-chevron-left" />
              </IconButton>
            </Link>
          </section>

          <section className="name mt-2 text-center">
            <span>{props.user.nickname || 'スタッフ'}</span>

            <Link route={'/view/settings/account'}>
              <div className="edit">編集</div>
            </Link>
          </section>

          <section className="desc mt-4 text-center">
            東京で働いています。ファッション大好き。<br />
            どうぞよろしくお願いいたします！
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

          <section className="badges mt-2 row justify-content-center">
            {range(6).map(i => (
              <div key={i} className="badge col-3 py-2">
                <img src="/static/stub/badges/001.png" />
              </div>
            ))}
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

          .badges {
            width: 270px;
            margin: 0 auto;
          }

          .badge img {
            width: 52px;
            height: 73px;
            object-fit: cover;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Mypage)
