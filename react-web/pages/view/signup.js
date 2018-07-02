import React from 'react'
import { Link } from '/routes'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import RoundWideButton from 'components/atoms/RoundWideButton'
import Rule from 'constants/Rule'
import URL from 'constants/URL'

const btnStyle = {
  width: '100%'
}

class SignUp extends React.Component {
  render() {
    const state = this.state
    const props = this.props
    const { classes } = props

    return (
      <React.Fragment>
        <div className="sharedContainer">
          <section className="">
            <img src="/static/img/logo.png" />
          </section>

          <section className="mt-4">
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              color={'#2b6db2'}
              icon={<i className="fab fa-facebook-f" />}
            >
              Facebookで登録
            </RoundWideButton>
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              color={'#2b6db2'}
              icon={<i className="fab fa-twitter" />}
            >
              Twitterで登録
            </RoundWideButton>
          </section>

          <section className="my-2">
            <img src="/static/img/login-or-big.png" />
          </section>

          <section className="">
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              color={'gray'}
              icon={<i className="fab fa-facebook-f" />}
            >
              メールアドレスで登録
            </RoundWideButton>
          </section>

          <section className="mt-3 text-center">
            <a>ログイン</a>
          </section>
        </div>

        <style jsx>{`
          .sharedContainer {
            width: 90%;
            max-width: 360px;
            margin: 30% auto;
          }

          img {
            width: 100%;
          }

          .sharedContainer a {
            color: #909090;
            text-decoration: underline;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // post: state.site.post
}))(SignUp)
