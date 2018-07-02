import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import { Link } from 'routes'
import Input from 'reactstrap/lib/Input'
import RoundWideButton from 'components/atoms/RoundWideButton'
import ColorButton from 'components/atoms/ColorButton'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'
import API from 'utils/API'

const btnStyle = {
  width: '100%'
}
const inputStyle = {
  borderRadius: 30,
  padding: '10px 20px'
}

class Signin extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  // ERRORハンドリングしやすいのでここでFETCH
  async signin(e) {
    const { email, password } = this.state
    const res = await API.post('/signin', { email, password })
    console.info('SIGNIN', res)
    if (res.ok) {
      // TODO:
      // yield put(loadDataSuccess(data))
    } else {
      // const message = await res.text()
      this.setState({
        ...this.state,
        errorMessage:
          'メールアドレスかパスワードが間違っています。再度入力し直してください。'
      })
    }

    // this.props.dispatch(createAction(User.SIGNIN_REQUEST)({ email, password }))
  }

  render() {
    return (
      <React.Fragment>
        <CenteredContainer height={520}>
          <section>
            <SignInUpHeader text="ログイン" route={'/view/signup'} />
          </section>

          <section className="mt-5">
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
          </section>

          <section className="">
            <div className="form-group">
              <Input
                type="email"
                style={inputStyle}
                placeholder="メールアドレス"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                style={inputStyle}
                placeholder="パスワード"
                value={this.state.password}
                onChange={this.handleChange('password')}
              />
            </div>
          </section>

          {this.state.errorMessage && (
            <div className="alert alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
          )}

          <section className="text-center" onClick={this.signin.bind(this)}>
            <ColorButton className="w-75 mt-2" color="#2b6db2">
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
