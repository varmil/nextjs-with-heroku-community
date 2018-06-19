import React from 'react'

export default class MenuBar extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="cs-header-navbar__toolbar">
          <ul className="cs-header-toolbar">
            <li className="cs-header-toolbar__item liNotify">
              <div className="divInner">
                <a href="/user/add">
                  <span className="spanText">
                    <i id="ai" className="fas fa-bell" />
                  </span>
                </a>
              </div>
            </li>
            <li className="cs-header-toolbar__item liAccount">
              <div className="divInner">
                <a href="/auth/login">
                  <span className="spanText">
                    <i id="ai" className="fas fa-user" />
                  </span>
                </a>
              </div>
            </li>
          </ul>
        </div>

        <style jsx>{`
          a {
            color: ${props.style.color};
          }

          .liAccount .divInner:before {
            background-color: ${props.style.color};
            content: '';
            position: absolute;
            left: -6px;
            top: 4px;
            width: 1px;
            height: 28px;
          }

          .cs-header-navbar__toolbar {
            clear: both;
            height: 44px;
          }

          .cs-header-toolbar {
            background-color: ${props.style.backgroundColor};
          }

          .cs-header-toolbar {
            display: table;
            width: 100%;
          }

          ul,
          ol {
            margin: 0;
            padding-left: 0;
          }

          .cs-header-toolbar__item {
            width: 33%;
            padding: 5px 5px 5px 6px;
            display: table-cell;
            vertical-align: middle;
          }

          li {
            list-style-type: none;
          }

          .divInner {
            position: relative;
            height: 34px;
            border-radius: 4px;
            font-size: 22px;
            text-align: center;
            cursor: pointer;
            user-select: none;
          }

          .liNotify .spanText,
          .liAccount .spanText {
            line-height: 22px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
