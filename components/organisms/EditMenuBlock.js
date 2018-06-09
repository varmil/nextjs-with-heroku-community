import React from 'react'

const STATE = {
  INTERNAL: 0,
  EXTERNAL: 1
}

export default class EditMenuBlock extends React.Component {
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
        <div className="editNav_menuBlock">
          <label className="editMenu_group">
            <div className="editMenu_text">テキスト</div>
            <div className="editMenu_controller">
              <input
                className="menuText"
                type="text"
                name="menuText"
                value={props.text || ''}
              />
            </div>
          </label>

          <div className="editMenu_group">
            <div className="editMenu_text">リンク</div>
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
          </div>

          <div
            className="editNav_delete"
            onClick={() => props.onDelete(props.id)}
          >
            <div className="editNav_deleteBtn">
              <i className="fa fa-times" />
            </div>
          </div>
        </div>

        <style jsx>{`
          ul,
          li {
            list-style-type: none;
          }

          .editNav_menuBlock {
            position: relative;
            padding: 20px;
            border: 1px solid #ccc;
            margin-bottom: 20px;
            border-radius: 5px;
            background-color: #fff;
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

          .editNav_delete {
            position: absolute;
            top: -15px;
            right: -15px;
            width: 30px;
            height: 30px;
            cursor: pointer;
          }

          .editNav_deleteBtn {
            width: 30px;
            height: 30px;
            opacity: 0.4;
            -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=40)';
            border-radius: 50%;
            background-color: #05161a;
            text-align: center;
            box-shadow: 0 2px 6px rgba(100, 100, 100, 0.8);
            transition: all 0.1s ease-in;
          }

          .editNav_delete:hover .editNav_deleteBtn {
            opacity: 1;
            -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
            background-color: #e31f1f;
          }

          .editNav_deleteBtn > i {
            color: #e31f1f;
            font-size: 15px;
            line-height: 30px;
            ransition: all 0.1s ease-in;
          }

          .editNav_delete:hover .editNav_deleteBtn > i {
            color: #fff;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
