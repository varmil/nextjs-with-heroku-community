import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import { createAction } from 'redux-actions'
import { setSuccess } from 'actions/application'
import { User } from 'constants/ActionTypes'
import Modal from 'reactstrap/lib/Modal'
import ModalBody from 'reactstrap/lib/ModalBody'
import Welcome from 'pages/admin/site/edit/welcome'
import AdminRegisterForm from 'components/templates/admin/AdminRegisterForm'
import Color from 'constants/Color'

class WelcomeSignup extends React.Component {
  // static async getInitialProps({ ctx }) {
  //   // const { dispatch } = ctx.store
  //   console.info('thisis signup')
  //   const { overlay } = ctx.query
  //   return { overlay }
  // }

  state = {
    modal: false
  }

  componentDidMount() {
    this.setState({
      modal: true
    })
  }

  onSave(state) {
    console.info('state', state)
    const successCb = async res => {
      this.props.dispatch(setSuccess())
      Router.pushRoute(`/admin/site/edit/welcome`)
    }
    this.props.dispatch(
      createAction(User.AUTH_ADMIN_REQUEST)({
        ...state,
        successCb
      })
    )
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <Welcome />

        <Modal
          isOpen={this.state.modal}
          className={`container`}
          style={{ maxWidth: 750 }}
          backdrop={'static'}
          centered={true}
        >
          <ModalBody>
            <div className="panel mb-5">
              <span>
                Communeへようこそ！<br />
                管理者登録のために以下の情報を教えてください。<br />
                これらの情報は後からいつでも修正することが可能です。
              </span>
            </div>

            <AdminRegisterForm onSave={this.onSave.bind(this)} />
          </ModalBody>
        </Modal>

        <style jsx>{`
          .panel {
            padding: 30px;
            border: 3px ${Color.MAIN_BLUE} solid;
            border-radius: 20px;
            margin: 0 auto;
            font-weight: bold;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // preview: state.site.preview,
  // site: state.site
}))(WelcomeSignup)
