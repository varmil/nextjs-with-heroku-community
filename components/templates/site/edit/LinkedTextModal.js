import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import LinkEditor from 'components/molecules/site/edit/LinkEditor'
import WideModal from 'components/organisms/modal/WideModal'
import { createExistingImages } from 'components/molecules/site/edit/ImageShower'

// ロゴやバナーなどリンクできる画像を編集するモーダル
class LinkedTextModal extends React.Component {
  render() {
    return (
      <WideModal isOpen={this.props.isOpen || false} toggle={this.props.toggle}>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">テキスト編集</label>
            <div className="col-sm-10">TODO</div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">デザイン</label>
            <div className="col-sm-10">
              <ImageUploadButton className="mb-3" />
              {createExistingImages()}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">リンク</label>
            <div className="col-sm-10">
              <LinkEditor />
            </div>
          </div>
        </ModalBody>
      </WideModal>
    )
  }
}

export default LinkedTextModal
