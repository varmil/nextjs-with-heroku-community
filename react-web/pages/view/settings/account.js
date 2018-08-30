import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Link, Router } from 'routes'
import { User } from 'constants/ActionTypes'
import Input from 'reactstrap/lib/Input'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import * as utilFiles from 'utils/files'
import ColorButton from 'components/atoms/ColorButton'
import ProfileIconSelector from 'components/atoms/ProfileIconSelector'
import BorderedTextHeader from 'components/organisms/site/BorderedTextHeader'
import Color from 'constants/Color'
import Rule from '/../shared/constants/Rule'

const NULL_FEEDBACK = '1文字以上入力してください。'

const inputStyle = {
  borderRadius: 10
}

class Account extends React.Component {
  constructor(props) {
    super(props)

    const { nickname, introduction, email, iconPath } = props.user
    const state = {
      nickname: nickname || '',
      introduction: introduction || '',
      email: email || '',
      password: '',
      files: iconPath
        ? [{ [utilFiles.FROM_SERVER_KEY]: true, preview: iconPath }]
        : [],
      errorMessage: ''
    }
    this.state = state
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onDrop(files) {
    if (files.length > 1) {
      files = files.slice(0, 1)
    }
    this.setState({ ...this.state, files: files })
  }

  onSubmit = () => {
    console.info('state', this.state)

    const successCb = async res => {
      Router.back()
    }
    this.props.dispatch(
      createAction(User.SAVE_PROFILE_REQUEST)({
        successCb,
        // 面倒なので全部渡してSAGAでフィルタリングする
        data: { ...this.state }
      })
    )
  }

  render() {
    const props = this.props
    const { files, nickname, introduction, email, password } = this.state
    const passLength = password.length
    return (
      <React.Fragment>
        <BorderedTextHeader text="アカウント設定" />

        <div className="container mb-3">
          <section className="contentWrap mt-3 text-center">
            <div className="mt-3 mx-auto" style={{ width: 150 }}>
              <ProfileIconSelector
                size={100}
                files={files}
                onDrop={this.onDrop.bind(this)}
              />
            </div>
          </section>

          <section className="mt-0">
            <label className="mb-1">ユーザ名</label>
            <Input
              type="text"
              style={inputStyle}
              value={nickname}
              maxLength={Rule.NICKNAME_MAX_LENGTH}
              onChange={this.handleChange('nickname')}
              invalid={nickname === ''}
            />
            <FormFeedback>{NULL_FEEDBACK}</FormFeedback>
          </section>

          <section className="mt-3">
            <label className="mb-1">自己紹介</label>
            <Input
              type="textarea"
              rows={3}
              style={inputStyle}
              value={introduction}
              maxLength={Rule.INTRODUCTION_MAX_LENGTH}
              onChange={this.handleChange('introduction')}
            />
          </section>

          <section className="mt-3">
            <label className="mb-1">メールアドレス</label>
            <Input
              type="text"
              style={inputStyle}
              value={email}
              onChange={this.handleChange('email')}
              invalid={email === ''}
            />
            <FormFeedback>{NULL_FEEDBACK}</FormFeedback>
          </section>

          <section className="mt-3">
            <label className="mb-1">パスワード</label>
            <Input
              type="text"
              style={inputStyle}
              value={password}
              onChange={this.handleChange('password')}
              invalid={passLength > 0 && passLength < Rule.PASS_MIN_LENGTH}
            />
            <FormFeedback>
              {Rule.PASS_MIN_LENGTH}文字以上入力してください
            </FormFeedback>
          </section>

          <section className="mt-4 text-center">
            <ColorButton
              className="w-50"
              color={Color.MAIN_BLUE}
              onClick={this.onSubmit}
            >
              保存する
            </ColorButton>
          </section>
        </div>

        <style jsx>{`
          .container {
            padding-left: 45px;
            padding-right: 45px;
          }

          .contentWrap {
            font-size: 16px;
          }

          label {
            font-size: 12px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Account)
