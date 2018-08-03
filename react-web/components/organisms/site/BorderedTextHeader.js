import React from 'react'
import { Router, Link } from 'routes'
import IconButton from '@material-ui/core/IconButton'
import URL from 'constants/URL'

const iconButtonStyle = {
  position: 'absolute',
  left: '3%',
  top: '15px'
}

/**
 * 設定画面や通知画面で使うヘッダ
 */
export default props => {
  return (
    <React.Fragment>
      <section className="header mt-4 pb-3 text-center">
        <span>{props.text}</span>

        {/* <Link route={URL.VIEW_HOME}> */}
        <IconButton style={iconButtonStyle} onClick={() => Router.back()}>
          <i className="fas fa-chevron-left" />
        </IconButton>
        {/* </Link> */}
      </section>

      <style jsx>{`
        .header {
          border-bottom: 3px solid #f0f0f0;
        }

        .header span {
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
    </React.Fragment>
  )
}
