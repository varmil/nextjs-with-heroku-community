import React from 'react'
import {
  MultipleToggleGroup,
  MultipleToggle
} from 'components/atoms/MultipleToggle'

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
    return state === this.state.linkState
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="editMenu_controller">
          <MultipleToggleGroup className="mr-3">
            <MultipleToggle
              selected={this.addSelectedIfMatch(STATE.INTERNAL)}
              onClick={() =>
                this.setState({ ...this.state, linkState: STATE.INTERNAL })
              }
              text="サイト内"
            />
            <MultipleToggle
              selected={this.addSelectedIfMatch(STATE.EXTERNAL)}
              onClick={() =>
                this.setState({ ...this.state, linkState: STATE.EXTERNAL })
              }
              text="URL"
            />
          </MultipleToggleGroup>

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

        <style jsx>{`
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
