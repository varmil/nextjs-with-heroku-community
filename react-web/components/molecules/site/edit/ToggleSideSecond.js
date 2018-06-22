import React from 'react'
import Color from 'constants/Color'

export default class ToggleSideSecond extends React.Component {
  addSelectedIfNeeded() {
    return this.props.selected ? 'selected' : ''
  }

  render() {
    const props = this.props

    return (
      <div style={props.style}>
        <div className={`toggleSideSecond ${this.addSelectedIfNeeded()}`}>
          <a href="javascript:void(0);">
            <i className={`fas ${props.icon}`} />
            {props.text}
          </a>
          <i className="fas fa-chevron-right" />
        </div>

        <style jsx>{`
          .toggleSideSecond {
            position: relative;
            padding: 10px 0;
            cursor: pointer;
            font-size: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .toggleSideSecond.selected {
            background-color: ${Color.PERA_BLUE};
          }

          .toggleSideSecond > a {
            display: block;
            padding-left: 6px;
          }

          .toggleSideSecond:hover {
            background-color: ${Color.PERA_BLUE};
            border-color: ${Color.PERA_BLUE};
            color: #fff;
          }

          .toggleSideSecond > a i {
            margin-right: 8px;
            font-size: 16px;
            vertical-align: middle;
          }

          .toggleSideSecond i[class*='chevron'] {
            position: absolute;
            top: 14px;
            right: 10px;
          }
        `}</style>
      </div>
    )
  }
}
