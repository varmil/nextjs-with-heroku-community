import React from 'react'

const initialState = {}

export default class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <div className="row">
        <nav
          className="col-auto bg-faded sidebar"
          style={{ width: this.props.width }}
        >
          <ul className="sidebarActions">
            <li id="saveBtn" title="⌘+s" className="">
              <a href="javascript:void(0);" className="save mp_save">
                <i className="far fa-save" />
                <span className="saveBtn_txt">保存する</span>
              </a>
            </li>
            <li id="togglePublishBtn">
              <a href="javascript:void(0);" className="publish">
                <i className="fas fa-globe" />
                <span className="publishTxt">公開する</span>
              </a>
            </li>
            <li id="lp_info_button">
              <a href="javascript:void(0);" className="mp_info">
                <i className="fas fa-cog" />ページ情報編集
              </a>
            </li>
            <li id="previewBtn">
              <a href="javascript:void(0);" className="mp_preview">
                <i className="fas fa-shoe-prints" />プレビュー
              </a>
            </li>
          </ul>

          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Overview <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </nav>

        <style jsx>{`
          .sidebar {
            position: fixed;
            top: ${this.props.offsetTop}px;
            bottom: 0;
            left: 0;
            z-index: 1000;
            padding: 0px;
            overflow-x: hidden;
            overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
          }

          .sidebar .nav {
            margin-bottom: 20px;
          }

          .sidebar .nav-item {
            width: 100%;
          }

          .sidebar .nav-item + .nav-item {
            margin-left: 0;
          }

          .sidebar .nav-link {
            border-radius: 0;
          }

          .bg-faded {
            background-color: #05161a;
          }

          /* peraichi */
          .sidebar ul {
            padding-left: 0;
          }

          ul,
          li {
            list-style-type: none;
          }

          .sidebarActions li:nth-child(odd) {
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }

          .sidebarActions li {
            float: left;
            display: block;
            width: 50%;
            margin: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            font-size: 11px;
          }

          .sidebarActions li a {
            display: block;
            height: 90px;
            padding-top: 29px;
          }

          .sidebarActions li a:hover {
            background-color: #0090a1;
            border-color: #0090a1;
            color: #fff;
          }

          .sidebar a {
            color: #fff;
            transition: background 0.12s ease-in;
          }

          a {
            margin: 0;
            padding: 0;
            font-size: 100%;
            vertical-align: baseline;
            background: transparent;
          }

          a:link,
          a:visited {
            text-decoration: none;
          }

          .sidebarActions .fa,
          .sidebarActions .far,
          .sidebarActions .fas {
            position: relative;
            display: block;
            margin-bottom: 11px;
            font-size: 24px;
            line-height: 1;
          }
          /* peraichi end */
        `}</style>
      </div>
    )
  }
}
