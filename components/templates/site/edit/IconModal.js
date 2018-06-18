import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import ColorPicker from 'components/molecules/ColorPicker'
import WideModal from 'components/organisms/modal/WideModal'

// ロゴやバナーなどリンクできる画像を編集するモーダル
class IconModal extends React.Component {
  render() {
    return (
      <WideModal isOpen={this.props.isOpen || false} toggle={this.props.toggle}>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-2 col-form-label">カラー変更</label>
            <div className="col-10">
              <ColorPicker onClick={this.props.onChangeColor} />
            </div>
          </div>
        </ModalBody>
      </WideModal>
    )
  }
}

export default IconModal
