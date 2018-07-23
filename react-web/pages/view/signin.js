import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import { Link, Router } from 'routes'
import Input from 'reactstrap/lib/Input'
import ColorButton from 'components/atoms/ColorButton'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'
import Rule from '/../shared/constants/Rule'

// import RoundWideButton from 'components/atoms/RoundWideButton'
// const btnStyle = {
//   width: '100%'
// }
// const inputStyle = {
//   borderRadius: 15,
//   padding: '10px 20px'
// }

const E_MESSAGE =
  'メールアドレスかパスワードが間違っています。再度入力し直してください。'

class Signin extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  // ERRORハンドリングしやすいのでここでPOST
  async signin(e) {
    const { email, password } = this.state
    const successCb = async res => {
      Router.pushRoute(`/view/home`)
    }
    this.props.dispatch(
      createAction(User.SIGNIN_REQUEST)({
        email,
        password,
        successCb,
        errorMessage: E_MESSAGE
      })
    )
  }

  render() {
    const { email, password } = this.state

    return (
      <React.Fragment>
        <CenteredContainer height={430}>
          <section>
            <SignInUpHeader text="ログイン" route={'/view/signup'} />
          </section>

          {/* <section className="oauth mt-5">
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              color={'#2b6db2'}
              icon={<i className="fab fa-facebook-f" />}
            >
              Facebookでログイン
            </RoundWideButton>
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              color={'#2b6db2'}
              icon={<i className="fab fa-twitter" />}
            >
              Twitterでログイン
            </RoundWideButton>
          </section>

          <section className="my-4">
            <img src="/static/img/login-or-big.png" />
          </section> */}

          <section className="mt-5">
            <div className="form-group">
              <label>メールアドレス</label>
              <Input
                type="email"
                // style={inputStyle}
                placeholder="メールアドレスを入力"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </div>

            <div className="mt-4 form-group">
              <label>パスワード（半角英数字で8 ~ 40文字）</label>
              <Input
                type="password"
                // style={inputStyle}
                placeholder="パスワードを入力"
                value={this.state.password}
                onChange={this.handleChange('password')}
              />
            </div>
          </section>

          <section
            className="mt-5 text-center"
            onClick={this.signin.bind(this)}
          >
            <ColorButton
              className="w-75"
              color="#2b6db2"
              disabled={!email || password.length < Rule.PASS_MIN_LENGTH}
            >
              ログインする
            </ColorButton>
          </section>

          <section className="login mt-3 text-center">
            <Link route="/view/signin">
              <a>パスワードをお忘れの方はこちら</a>
            </Link>
          </section>
        </CenteredContainer>

        <style jsx>{`
          img {
            width: 100%;
          }

          .login a {
            font-size: 12px;
            color: #909090;
            text-decoration: underline;
          }

          label,
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
}))(Signin)
