import React from 'react'

export default class MenuBar extends React.Component {
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <div className="cs-header-menubar">
          <div className="container">
            <ul className="listContainer">
              <li className="listItem is-active">
                <a href="/">ホーム</a>
              </li>
              <li className="listItem ">
                <a href="/talk/talk/">トークルーム</a>
              </li>
              <li className="listItem ">
                <a href="/article/blog/">企業発信</a>
              </li>
              <li className="listItem ">
                <a href="/recipe/recipe/">企業ストーリー</a>
              </li>
              <li className="listItem ">
                <a href="/article/blog_story/">投票・アンケート</a>
              </li>
              <li className="listItem ">
                <a href="/review/product/">お知らせ</a>
              </li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          .cs-header-menubar {
            width: 100%;
            background: #633826;
          }

          .listContainer {
            height: 44px;
            overflow: hidden;
          }

          ul,
          ol {
            padding-left: 0;
          }

          ul,
          ol,
          dl {
            margin: 0;
            font-size: 1em;
            font-weight: normal;
          }

          .listItem {
            display: table-cell;
          }

          li {
            list-style-type: none;
          }

          .listItem.is-active a {
            background-color: #e71421;
          }

          .listItem a:active,
          .listItem a:hover {
            background-color: #e71421;
            color: #fff;
          }

          .listItem a {
            color: #fff;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: block;
            height: 44px;
            padding: 0 20px;
            font-size: 14px;
            line-height: 44px;
            font-weight: bold;
          }

          a {
            text-decoration: none;
          }
        `}</style>
      </div>
    )
  }
}
