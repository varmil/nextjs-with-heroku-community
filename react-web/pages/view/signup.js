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
        <div className="container">
          <section className="">
            <img src="/static/img/logo.png" />
          </section>

          <section className="mt-5">
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              icon={<i className="fab fa-facebook-f" />}
            >
              Facebookで登録
            </RoundWideButton>
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              icon={<i className="fab fa-twitter" />}
            >
              Twitterで登録
            </RoundWideButton>
          </section>

          <section className="mt-3">
            <img src="/static/img/login-or-big.png" />
          </section>
        </div>

        <style jsx>{`
          img {
            width: 100%;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // post: state.site.post
}))(SignUp)
