import React from 'react'

// URL指定でリンク先を選択できる
export default class LinkEditor extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="editMenu_controller">
          <div className="editMenu_menuLinkGroup">
            <div className="editMenu_link external">
              <input
                className="menuHref"
                type="text"
                name="menuHref"
                value={props.href}
                onChange={props.onChangeHref}
                placeholder="https://..."
              />
              <label className="editMenu_target">
                <input
                  type="checkbox"
                  checked={props.blank}
                  onChange={props.onChangeBlank}
                  name="menuTarget"
                />別ウインドウ
              </label>
            </div>
          </div>
        </div>

        <style jsx>{`
          .editMenu_controller {
            display: table-cell;
          }

          .editMenu_controller [name='menuHref'] {
            width: 480px;
          }

          input[type='text'] {
            margin-bottom: 5px;
            padding: 7px 10px;
            font-size: 16px;
            border: 1px solid #ccc;
          }

          .editMenu_menuLinkGroup {
            display: inline-block;
            vertical-align: middle;
          }

          .editMenu_link {
            position: relative;
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
