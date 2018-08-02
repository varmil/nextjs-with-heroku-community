import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Link, Router } from 'routes'
import * as utilFiles from 'utils/files'
import ProfileIconSelector from 'components/atoms/ProfileIconSelector'
import BorderedTextHeader from 'components/organisms/site/BorderedTextHeader'

const Item = props => (
  <div
    className={`row ${props.className || ''}`}
    onClick={props.onClick || (() => {})}
  >
    <div className="col-9">{props.children}</div>
    <div className="col-2">
      <i className="fas fa-chevron-right" />
    </div>

    <style jsx>{`
      .row {
        font-size: 17px;
        font-weight: bold;
        color: #4b4b4b;
      }
    `}</style>
  </div>
)

class Account extends React.Component {
  constructor(props) {
    super(props)

    const { brandName, nickname, description, email, iconPath } = props
    const state = {
      brandName,
      nickname: nickname || '',
      description: description || '',
      email: email || '',
      password: '',
      files: iconPath
        ? [{ [utilFiles.FROM_SERVER_KEY]: true, preview: this.props.iconPath }]
        : [],
      errorMessage: ''
    }
    this.state = state
  }

  onDrop(files) {
    if (files.length > 1) {
      files = files.slice(0, 1)
    }
    this.setState({ ...this.state, files: files })
  }

  render() {
    const props = this.props
    const { files } = this.state
    return (
      <React.Fragment>
        <BorderedTextHeader text="アカウント設定" />

        <div className="container">
          <section className="contentWrap mt-3 text-center">
            <div className="mt-3 mx-auto" style={{ width: 150 }}>
              <ProfileIconSelector
                size={100}
                files={files}
                onDrop={this.onDrop.bind(this)}
              />
            </div>
          </section>
        </div>

        <style jsx>{`
          .header span {
            font-size: 20px;
            font-weight: bold;
          }

          .avatar i {
            font-size: 22px;
          }

          .contentWrap {
            font-size: 16px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Account)
