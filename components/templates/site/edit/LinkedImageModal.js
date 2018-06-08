import React from 'react'
import range from 'lodash/range'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

// 2x2 image container
const ImageContainer = props => {
  return (
    <div className={`row ${props.className}`}>
      {props.images}

      <style jsx>{`
        .row {
          height: 340px;
          overflow: scroll;
        }
      `}</style>
    </div>
  )
}

const Image = props => {
  return (
    <div className={`col-md-6 col-lg-6 text-center ${props.className}`}>
      <img src="https://dummyimage.com/500x180/000/fff.png" alt="a" />

      <style jsx>{`
        img {
          width: 100%;
          max-width: 600px;
        }
      `}</style>
    </div>
  )
}

const LinkEditor = props => {
  return (
    <div>
      <div className="form-row align-items-center mb-1">
        <label className="col-sm-2 col-form-label">リンク先URL</label>
        <div className="col-sm-5">
          <input
            type="url"
            className="form-control"
            placeholder="https://..."
          />
        </div>
        <div className="col-sm-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">別ウィンドウ</label>
          </div>
        </div>
      </div>

      <div className="form-row align-items-center">
        <label className="col-sm-2 col-form-label">サイト内</label>
        <div className="col-sm-5">
          <select id="inputState" className="form-control">
            <option selected>選んでください...</option>
            <option>...</option>
          </select>
        </div>
      </div>

      <style jsx>{`
        img {
          width: 100%;
          max-width: 600px;
        }
      `}</style>
    </div>
  )
}

const modalStyle = {
  maxWidth: '90%'
}

// ロゴやバナーなどリンクできる画像を編集するモーダル
class LinkedImageModal extends React.Component {
  createExistingImages() {
    const images = range(10).map(i => (
      <Image key={`image${i}`} className="mb-2" />
    ))
    return <ImageContainer className="mb-4" images={images} />
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen || false}
          backdrop={true}
          centered={true}
          toggle={this.props.toggle}
          style={modalStyle}
        >
          <ModalHeader>{this.props.headerText}</ModalHeader>
          <ModalBody>
            <div className="container">
              <button type="button" className="imgUploader_button mb-3">
                <i className="fa fa-folder-open" /> 画像を選択してアップロード
              </button>

              {this.createExistingImages()}
              <LinkEditor />
            </div>
          </ModalBody>
        </Modal>

        <style jsx>{`
          img {
            width: 100%;
          }

          .imgUploader_button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            outline: none;
            padding: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: #f7f7f7;
            border-radius: 0;
            box-shadow: inset 0 0 0 2px #ccc;
            font-size: 16px;
            padding: 7px 15px;
            transition: all 0.3s ease;
            position: relative;
          }
        `}</style>
      </div>
    )
  }
}

export default LinkedImageModal
