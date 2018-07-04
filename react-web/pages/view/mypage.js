import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import { Link, Router } from 'routes'
import Avatar from 'components/atoms/Avatar'
import SignInUpHeader from 'components/molecules/SignInUpHeader'

class Mypage extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: ''
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="container">
          <section className="mt-4 text-center">
            <Avatar
              src="https://www.w3schools.com/w3images/avatar2.png"
              size={60}
            />
          </section>

          <section className="name mt-2 text-center">
            <span> {props.user.nickname || 'Your Name'}</span>
            <div className="edit">編集</div>
          </section>

          <section className="desc mt-4 text-center">
            東京で働いています。ファッション大好き。<br />
            どうぞよろしくお願いいたします！
          </section>
        </div>

        <style jsx>{`
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
            position: absolute;
            bottom: 0px;
            right: 10%;
            font-size: 12px;
          }

          .desc {
            font-weight: bold;
            font-size: 14px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Mypage)
