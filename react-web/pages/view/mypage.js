import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import { Link, Router } from 'routes'
import Input from 'reactstrap/lib/Input'
import RoundWideButton from 'components/atoms/RoundWideButton'
import ColorButton from 'components/atoms/ColorButton'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'

class Mypage extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: ''
  }

  render() {
    return (
      <React.Fragment>
        HELLO
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
}))(Mypage)
