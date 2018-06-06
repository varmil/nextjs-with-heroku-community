import React from 'react'
import { Progress, Modal, ModalHeader, ModalBody } from 'reactstrap'

class LoadingModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen || false}
          className={this.props.className}
          backdrop={'static'}
          centered={true}
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

export default LoadingModal
