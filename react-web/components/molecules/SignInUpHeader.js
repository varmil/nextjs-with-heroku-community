import React from 'react'
import { Link } from '/routes'
import IconButton from '@material-ui/core/IconButton'

export default props => (
  <React.Fragment>
    <section className="header">
      {props.route && (
        <Link route={props.route}>
          <IconButton style={{ position: 'absolute', top: -5, left: 0 }}>
            <i className="fas fa-chevron-left" />
          </IconButton>
        </Link>
      )}

      <span>{props.text}</span>
    </section>

    <style jsx>{`
      .header {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }

      .header span {
        color: ${props.color || '#2b6db2'};
      }

      .iconButton {
        position: absolute;
        top: 7px;
        left: 15px;
      }
    `}</style>
  </React.Fragment>
)
