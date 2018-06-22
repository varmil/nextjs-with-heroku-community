import React from 'react'
import update from 'immutability-helper'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import DesignImageEdit from 'components/organisms/edit_modal/DesignImageEdit'
// import LinkEditor from 'components/molecules/site/edit/LinkEditor'

// バナー。リンク設定不可。画像編集のみのモーダル
class ImageModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { src: props.src }
  }

  onClickImage(src) {
    this.setState(
      update(this.state, {
        src: { $set: src }
      })
    )
  }

  render() {
    return (
      <React.Fragment>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <DesignImageEdit
              selectedImgSrc={this.state.src}
              onClickImage={this.onClickImage.bind(this)}
              secondToggleType={DesignImageEdit.TYPE_COMMUNE_LIB_IMAGE()}
            />
          </div>
        </ModalBody>
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(ImageModal)
