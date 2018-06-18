import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import ColorPicker from 'components/molecules/ColorPicker'

// ロゴやバナーなどリンクできる画像を編集するモーダル
class IconModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-2 col-form-label">カラー変更</label>
            <div className="col-10">
              <ColorPicker onClick={this.props.onChangeColor} />
            </div>
          </div>
        </ModalBody>
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(IconModal)
