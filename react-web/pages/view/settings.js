import React from 'react'
import range from 'lodash/range'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import IconButton from '@material-ui/core/IconButton'
import { Link, Router } from 'routes'
import Avatar from 'components/atoms/Avatar'
import MypageContents from 'components/templates/edit_view_shared/MypageContents'
import { AppMypage } from 'constants/ActionTypes'
import URL from 'constants/URL'

const iconButtonStyle = {
  position: 'absolute',
  left: '3%',
  top: '15px'
}

class Mypage extends React.Component {
  // state = {
  //   email: '',
  //   password: '',
  //   errorMessage: ''
  // }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="container">
          <section className="header mt-4 text-center">
            <span>設定</span>

            <Link route={URL.VIEW_HOME}>
              <IconButton style={iconButtonStyle}>
                <i className="fas fa-chevron-left" />
              </IconButton>
            </Link>
          </section>

          <section className="contentWrap mt-5 ml-4">
            <div className="text">ログアウト</div>
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
}))(Mypage)
