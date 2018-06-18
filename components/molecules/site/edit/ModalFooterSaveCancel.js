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
      </React.Fragment>
    )
  }
}
