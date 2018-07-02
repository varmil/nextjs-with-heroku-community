import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import Input from 'reactstrap/lib/Input'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import Rule from 'constants/Rule'
import ColorButton from 'components/atoms/ColorButton'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'
import API from 'utils/API'

class SignupEmail extends React.Component {
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

  async signup(e) {
    const { email, password } = this.state
    const res = await API.post('/signup', { email, password })
    console.info('SIGNUP', res)
    if (res.ok) {
      // TODO:
      // yield put(loadDataSuccess(data))
    } else {
      const json = await res.json()
      this.setState({
        ...this.state,
        errorMessage: <span>{json.error}</span>
      })
    }

    // this.props.dispatch(createAction(User.SIGNUP_REQUEST)({ email, password }))
  }

  render() {
    const passLength = this.state.password.length
    return (
      <CenteredContainer height={460}>
        <section>
          <SignInUpHeader text="アカウント登録" route={'/view/signup'} />
        </section>

        <section className="mt-5">
          <div className="form-group">
            <label>メールアドレス</label>
            <Input
              type="email"
              placeholder="foo@example.com"
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
          </div>
        </section>

        <section className="mt-3">
          <div className="form-group">
            <label>パスワード</label>
            <Input
              type="text"
              placeholder={`${Rule.PASS_MIN_LENGTH}文字以上`}
              value={this.state.password}
              onChange={this.handleChange('password')}
              invalid={passLength > 0 && passLength < Rule.PASS_MIN_LENGTH}
            />
            <FormFeedback>
              {Rule.PASS_MIN_LENGTH}文字以上入力してください
            </FormFeedback>
          </div>
        </section>

        {this.state.errorMessage && (
          <div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
          </div>
        )}

        <section className="text-center" onClick={this.signup.bind(this)}>
          <ColorButton className="w-75 mt-4" color="#2b6db2">
            アカウント登録
          </ColorButton>
        </section>

        <section className="regNote mt-3 text-center">
          上のアカウント登録ボタンを押すことにより、<br />
          <a>利用規約</a> に同意したことになります。
        </section>

        <style jsx>{`
          .regNote,
          label {
            font-size: 12px;
          }

          .alert {
            font-size: 12px;
          }
        `}</style>
      </CenteredContainer>
    )
  }
}

export default connect(state => ({
  // post: state.site.post
}))(SignupEmail)
