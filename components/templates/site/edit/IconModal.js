import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import BgColorPicker from 'components/molecules/BgColorPicker'
import WideModal from 'components/organisms/modal/WideModal'

// ロゴやバナーなどリンクできる画像を編集するモーダル
class IconModal extends React.Component {
  render() {
    return (
      <WideModal isOpen={this.props.isOpen || false} toggle={this.props.toggle}>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">カラー変更</label>
            <div className="col-sm-10">
              <BgColorPicker onClick={this.props.onChangeColor} />
            </div>
          </div>
        </ModalBody>
      </WideModal>
    )
  }
}

export default IconModal
