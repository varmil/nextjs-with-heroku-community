import React from 'react'
import ToggleSideSecond from '../../molecules/edit/ToggleSideSecond'

const initialState = {}

export default class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <nav className="bg-faded sidebar" style={{ width: this.props.width }}>
        <ul className="sidebarActions">
          <li title="⌘+s" className="">
            <a href="javascript:void(0);" className="save">
              <i className="far fa-save" />
              <span className="saveBtn_txt">保存する</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" className="publish">
              <i className="fas fa-globe" />
              <span className="publishTxt">公開する</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <i className="fas fa-cog" />ページ情報編集
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <i className="fas fa-shoe-prints" />プレビュー
            </a>
          </li>
        </ul>

        <ul className="sidebarUndoRedo">
          <li title="⌘+z">
            <a className="undo_btn grayout" href="javascript:void(0);">
              <i className="fas fa-undo" />
              操作を<br />1つ戻す
            </a>
          </li>
          <li title="⌘+shift+z">
            <a className="redo_btn grayout" href="javascript:void(0);">
              <i className="fas fa-redo" />
              操作を<br />1つ進める
            </a>
          </li>
        </ul>

        <ul
          id="editor-size-controller"
          data-size-default="1024"
          className="sidebarDevice"
        >
          <li data-size="1024">
            <a className="selected" title="PCサイズ" href="javascript:void(0);">
              <i className="fas fa-desktop" />
            </a>
          </li>
          <li data-size="768">
            <a title="タブレットサイズ" href="javascript:void(0);">
              <i className="fas fa-tablet-alt" />
            </a>
          </li>
          <li data-size="320">
            <a title="スマホサイズ" href="javascript:void(0);">
              <i className="fas fa-mobile-alt" />
            </a>
          </li>
        </ul>

        <div>
          <ToggleSideSecond icon="fa-object-group" text="レイアウト変更" />
          <ToggleSideSecond
            icon="fa-clipboard-list"
            text="テーマカラー変更"
            selected={true}
          />
          <ToggleSideSecond icon="fa-font" text="フォント変更" />
          <ToggleSideSecond icon="fa-images" text="バナー追加" />
          <ToggleSideSecond icon="fa-box" text="ボックス追加" />
        </div>

        <style global jsx>{`
          .sidebar {
            color: #fff !important;
          }

          .sidebar a {
            color: #fff !important;
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
            text-decoration: none !important;
          }
        `}</style>

        <style jsx>{`
          .sidebar {
            position: fixed;
            top: ${this.props.offsetTop}px;
            bottom: 0;
            left: 0;
            z-index: 1000;
            padding: 0px;
            overflow-x: auto;
            overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
          }

          .bg-faded {
            background-color: #05161a;
          }
        `}</style>

        {/* peraichi flat4 */}
        <style jsx>{`
          .sidebar ul {
            padding-left: 0;
          }

          ul,
          li {
            list-style-type: none;
          }

          .sidebarActions {
            display: inline-block;
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

        {/* UndoRedo */}
        <style jsx>{`
          .sidebarUndoRedo {
            overflow: hidden;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .sidebarUndoRedo li {
            position: relative;
            display: block;
            float: left;
            width: 50%;
            line-height: 1.3;
            font-size: 12px;
          }

          .sidebarUndoRedo a.grayout,
          .sidebarUndoRedo a:link.grayout,
          .sidebarUndoRedo a:hover.grayout {
            color: gray;
            background-color: #072127;
            cursor: default;
          }

          .sidebarUndoRedo li:first-child a {
            padding-left: 20px;
          }

          .sidebarUndoRedo li:first-child a i {
            position: absolute;
            top: 20px;
            left: 3px;
          }

          .sidebarUndoRedo li:nth-child(2) a i {
            position: absolute;
            top: 20px;
            right: 8px;
          }

          .sidebarUndoRedo a {
            display: block;
            padding: 12px 0;
            background-repeat: no-repeat;
          }
        `}</style>

        {/* Editor size controller */}
        <style jsx>{`
          .sidebarDevice {
            position: relative;
            top: -1px;
            overflow: hidden;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .sidebarDevice li {
            display: block;
            float: left;
            width: 33.3333%;
            height: 60px;
          }

          .sidebarDevice a:hover,
          .sidebarDevice a.selected {
            color: #fff;
            background-color: #0090a1;
          }

          .sidebarDevice a {
            display: block;
            height: 100%;
            text-align: center;
          }

          .sidebarDevice .fa,
          .sidebarDevice .far,
          .sidebarDevice .fas {
            font-size: 30px;
            line-height: 60px;
          }
        `}</style>
      </nav>
    )
  }
}
