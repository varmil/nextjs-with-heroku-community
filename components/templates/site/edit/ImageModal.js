import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import DesignImageEdit from 'components/organisms/editor_parts/form/DesignImageEdit'
// import LinkEditor from 'components/molecules/site/edit/LinkEditor'

// バナー。リンク設定不可。画像編集のみのモーダル
class ImageModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <DesignImageEdit
              onClickImage={this.props.onClickModalImage}
              secondToggleType={DesignImageEdit.TYPE_COMMUNE_LIB_IMAGE()}
            />
          </div>

          {/* <div className="form-group row">
            <label className="col-2 col-form-label">リンク</label>
            <div className="col-10">
              <LinkEditor />
            </div>
          </div> */}
        </ModalBody>
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(ImageModal)
