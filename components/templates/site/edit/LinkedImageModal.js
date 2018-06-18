import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import DesignImageEdit from 'components/organisms/editor_parts/form/DesignImageEdit'
import LinkEditor from 'components/molecules/site/edit/LinkEditor'
import WideModal from 'components/organisms/modal/WideModal'

// ロゴやバナーなどリンクできる画像を編集するモーダル
class LinkedImageModal extends React.Component {
  render() {
    return (
      <WideModal isOpen={this.props.isOpen || false} toggle={this.props.toggle}>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <DesignImageEdit onClickImage={this.props.onClickModalImage} />
          </div>

          <div className="form-group row">
            <label className="col-2 col-form-label">リンク</label>
            <div className="col-10">
              <LinkEditor />
            </div>
          </div>
        </ModalBody>
      </WideModal>
    )
  }
}

export default LinkedImageModal
