import React from 'react'
import TallTextInput from 'components/atoms/TallTextInput'
import ProfileIconSelector from 'components/atoms/ProfileIconSelector'
import ColorButton from 'components/atoms/ColorButton'
import Color from 'constants/Color'

const mbStyle = { marginBottom: 20 }

class AdminRegisterForm extends React.Component {
  state = {
    brandName: '',
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    files: [],
    errorMessage: ''
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

  onSave() {
    this.props.onSave(this.state)
  }

  render() {
    const state = this.state
    return (
      <div>
        <div className="box" style={{}}>
          <div className="header my-3 px-3">管理者情報</div>
          <hr className="my-1 mb-3" />
          <div className="form form-group my-3 px-5">
            <label>アイコン</label>
            <div className="mt-3 mb-5" style={{ width: 150 }}>
              <ProfileIconSelector
                size={100}
                files={state.files}
                onDrop={this.onDrop.bind(this)}
              />
            </div>

            <label>所属名*</label>
            <TallTextInput
              placeholder="企業名 あるいは ブランド名を入力"
              style={{ ...mbStyle, width: 350 }}
              value={state.brandName}
              onChange={this.handleChange('brandName')}
              required
            />
          </div>

          <div className="form form-group px-5">
            <div className="row">
              <div className="col-6">
                <label>姓*</label>
                <TallTextInput
                  style={mbStyle}
                  value={state.lastName}
                  onChange={this.handleChange('lastName')}
                  required
                />
              </div>
              <div className="col-6">
                <label>名*</label>
                <TallTextInput
                  style={mbStyle}
                  value={state.firstName}
                  onChange={this.handleChange('firstName')}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form form-group px-5">
            <label>メールアドレス</label>
            <TallTextInput
              style={mbStyle}
              value={state.email}
              onChange={this.handleChange('email')}
            />
            <label>パスワード</label>
            <TallTextInput
              style={mbStyle}
              value={state.password}
              onChange={this.handleChange('password')}
            />
          </div>
        </div>

        <section className="mt-5 text-center">
          <ColorButton
            className="w-25"
            color={Color.MAIN_BLUE}
            onClick={this.onSave.bind(this)}
          >
            保存する
          </ColorButton>
        </section>

        <style jsx>{`
          .header,
          label {
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }
}
export default AdminRegisterForm
