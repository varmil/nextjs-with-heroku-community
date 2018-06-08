import React from 'react'
import { Progress, Modal, ModalHeader, ModalBody } from 'reactstrap'

// ロゴやバナーなどリンクできる画像を編集するモーダル
class LinkedImageModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen || false}
          className={this.props.className}
          backdrop={true}
          centered={true}
          toggle={this.props.toggle}
        >
          <ModalHeader>ピッタリのデザインを探しています...</ModalHeader>
          <ModalBody>
            <Progress animated color="info" value="100" />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default LinkedImageModal
