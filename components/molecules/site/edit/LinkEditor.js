import React from 'react'

const STATE = {
  INTERNAL: 0,
  EXTERNAL: 1
}

// サイト内 or URL指定でリンク先を選択できる
export default class LinkEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { linkState: STATE.INTERNAL }
  }

  addSelectedIfMatch(state) {
    return state === this.state.linkState ? 'selected' : ''
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        {/* <div className="editMenu_group">
          <div className="editMenu_text">リンク</div> */}
        <div className="editMenu_controller">
          <ul className="editMenu_selectLinkList">
            <li
              className={`editMenu_selectLink ${this.addSelectedIfMatch(
                STATE.INTERNAL
              )}`}
              onClick={() =>
                this.setState({ ...this.state, linkState: STATE.INTERNAL })
              }
            >
              サイト内
            </li>
            <li
              className={`editMenu_selectLink ${this.addSelectedIfMatch(
                STATE.EXTERNAL
              )}`}
              onClick={() =>
                this.setState({ ...this.state, linkState: STATE.EXTERNAL })
              }
            >
              URL
            </li>
          </ul>

          <div className="editMenu_menuLinkGroup">
            {/* URL */}
            <div
              className="editMenu_link external"
              style={{
                display:
                  this.state.linkState === STATE.EXTERNAL ? 'block' : 'none'
              }}
            >
              <input
                className="menuHref"
                type="text"
                name="menuHref"
                value={props.url || ''}
                placeholder="https://..."
              />
              <label className="editMenu_target">
                <input type="checkbox" name="menuTarget" />別ウインドウ
              </label>
            </div>

            {/* in the site */}
            <div
              className="editMenu_link internal"
              style={{
                display:
                  this.state.linkState === STATE.INTERNAL ? 'block' : 'none'
              }}
            >
              <select>
                <option value>▼サイト内リンクを選択する</option>
                <option value="#section-18">
                  第1ブロック: ナビゲーション・ロゴ(上部に固定)
                </option>
                <option value="#section-73">
                  第2ブロック: 右画像（1列）テキスト中央
                </option>
                <option value="#section-68">第8ブロック: テーブル</option>
              </select>
            </div>
          </div>
        </div>
        {/* </div> */}

        <style jsx>{`
          ul,
          li {
            list-style-type: none;
          }

          .editMenu_group {
            display: table;
            margin-bottom: 10px;
          }

          .editMenu_text {
            display: table-cell;
            vertical-align: middle;
            width: 120px;
          }

          .editMenu_controller {
            display: table-cell;
          }

          .editMenu_controller [name='menuHref'] {
            width: 400px;
          }

          input[type='text'] {
            margin-bottom: 5px;
            padding: 7px 10px;
            font-size: 16px;
            border: 1px solid #ccc;
          }

          .editMenu_controller [name='menuText'] {
            width: 400px;
          }

          .editMenu_selectLinkList {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            padding-left: 0;
            position: relative;
            top: 8px;
          }

          .editMenu_selectLink {
            float: left;
            width: 70px;
            padding: 6px 0;
            text-align: center;
            background-color: #ccc;
            cursor: pointer;
            color: #999;
            font-size: 12px;
            transition: all 0.25s ease;
          }

          .editMenu_selectLink.selected,
          .editMenu_selectLink:hover {
            background-color: #0090a1;
            color: #fff;
          }

          .editMenu_selectLink:nth-child(1) {
            border-radius: 5px 0 0 5px;
          }

          .editMenu_selectLink:nth-child(2) {
            border-radius: 0 5px 5px 0;
          }

          .editMenu_menuLinkGroup {
            display: inline-block;
            vertical-align: middle;
          }

          .editMenu_link {
            position: relative;
            display: none;
          }

          .editMenu_target {
            position: absolute;
            top: 10px;
            right: 5px;
            display: block;
            font-size: 12px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
