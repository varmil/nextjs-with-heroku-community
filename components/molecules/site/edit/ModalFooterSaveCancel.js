import React from 'react'
import { ModalFooter, Button } from 'reactstrap'

// 編集モーダルの汎用フッター
export default class ModalFooterSaveCancel extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <ModalFooter className="mt-0 mb-4" style={{ border: 'none' }}>
          <Button
            className="w-25 ml-auto"
            color="primary"
            onClick={props.onSave}
          >
            保存
          </Button>
          <Button
            className="w-25 mr-auto"
            color="secondary"
            onClick={props.onCancel}
          >
            キャンセル
          </Button>
        </ModalFooter>

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
