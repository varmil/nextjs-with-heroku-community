import React from 'react'
import Head from 'next/head'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import Slider from 'react-slick'
import IconButton from '@material-ui/core/IconButton'
import { Link, Router } from 'routes'
import Avatar from 'components/atoms/Avatar'
import MypageContents from 'components/templates/edit_view_shared/MypageContents'
import { AppMypage } from 'constants/ActionTypes'
import URL from 'constants/URL'

class SimpleSlider extends React.Component {
  render() {
    const { className } = this.props
    var settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <React.Fragment>
        <Slider className={`${className || ''}`} {...settings}>
          <div>
            <div className="row justify-content-center">
              {range(6).map(i => (
                <div key={i} className="badge col-3 py-2">
                  <img src="/static/stub/badges/001.png" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>2</h3>
          </div>

          <div>
            <h3>3</h3>
          </div>

          <div>
            <h3>4</h3>
          </div>
        </Slider>

        <style global jsx>{`
          .slick-dots {
            top: -5px;
            bottom: initial;
          }

          .slick-dots li {
            margin: 0 0px;
          }
        `}</style>

        <style jsx>{`
          .row {
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

          <section className="badges position-relative mt-3">
            <Link route={'/view/badge'}>
              <div className="badgeLink">詳しく見る</div>
            </Link>

            <SimpleSlider className="pt-4 mb-4" />
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
  user: state.user
}))(Mypage)
