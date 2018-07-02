import React from 'react'
import { Link } from '/routes'
import { connect } from 'react-redux'
import Rule from 'constants/Rule'
import URL from 'constants/URL'
import CenteredContainer from 'components/molecules/CenteredContainer'

class SignupEmail extends React.Component {
  state = {
    title: '',
    password: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const state = this.state
    const props = this.props

    return (
      <CenteredContainer height={500}>
        <section className="mt-3">
          <div className="form-group">
            <label>メールアドレス</label>
            <input
              type="email"
              className="form-control"
              placeholder="foo@example.com"
              value={this.state.title}
              onChange={this.handleChange('title')}
            />
          </div>
        </section>

        <section className="mt-3">
          <div className="form-group">
            <label>パスワード</label>
            <input
              type="password"
              className="form-control"
              placeholder="8文字以上"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
            <small id="emailHelp" className="form-text text-muted">
              Well never share your email with anyone else.
            </small>
          </div>
        </section>
      </CenteredContainer>
    )
  }
}

// const Styled = withStyles(inputStyles)(SignupEmail)
export default connect(state => ({
  // post: state.site.post
}))(SignupEmail)
