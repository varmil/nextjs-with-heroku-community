import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import Input from 'reactstrap/lib/Input'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import Role from '/../shared/constants/Role'
import Rule from '/../shared/constants/Rule'
import ColorButton from 'components/atoms/ColorButton'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'

class SignupEmail extends React.Component {
  static async getInitialProps({ ctx }) {
    const { code } = ctx.query

    // codeをもとにemail情報を取得
    const { dispatch } = ctx.store
    dispatch(createAction(User.FETCH_CODE_INFO_REQUEST)({ code }))

    return { code }
  }

  state = {
    email: this.props.email || '',
    password: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  async signup(e) {
    const { code, roleId } = this.props
    const { email, password } = this.state
    const successCb = res => {
      // 管理者アカウント or 一般ユーザで遷移先を変える
      const to =
        roleId >= Role.User.ADMIN_GUEST
          ? `/admin/settings/account/edit`
          : `/view/signup/complete`
      Router.pushRoute(to)
    }
    this.props.dispatch(
      createAction(User.SIGNUP_REQUEST)({
        email,
        password,
        code,
        successCb
      })
    )
  }

  render() {
    const { email, password } = this.state
    const passLength = password.length
    return (
      <CenteredContainer height={430}>
        <section>
          <SignInUpHeader text="アカウント登録" />
        </section>

        <section className="mt-5">
          <div className="form-group">
            <label>メールアドレス</label>
            <Input
              type="email"
              placeholder="メールアドレスを入力"
              value={email}
              onChange={this.handleChange('email')}
            />
          </div>

          <div className="mt-4 form-group">
            <label>パスワード（半角英数字で8 ~ 40文字）</label>
            <Input
              type="text"
              placeholder={`パスワードを入力`}
              value={password}
              onChange={this.handleChange('password')}
              invalid={passLength > 0 && passLength < Rule.PASS_MIN_LENGTH}
            />
            <FormFeedback>
              {Rule.PASS_MIN_LENGTH}文字以上入力してください
            </FormFeedback>
          </div>
        </section>

        <section className="mt-5 text-center" onClick={this.signup.bind(this)}>
          <ColorButton
            className="w-75"
            color="#2b6db2"
            disabled={!email || password.length < Rule.PASS_MIN_LENGTH}
          >
            アカウント登録
          </ColorButton>
        </section>

        <section className="regNote mt-3 text-center">
          上のアカウント登録ボタンを押すことにより、<br />
          <a>利用規約</a> に同意したことになります。
        </section>

        <style jsx>{`
          .regNote,
          label,
          .alert {
            font-size: 12px;
          }
        `}</style>
      </CenteredContainer>
    )
  }
}

export default connect(state => ({
  email: state.user.email,
  roleId: state.user.roleId
}))(SignupEmail)
