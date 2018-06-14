import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import { EditorState } from 'draft-js'
import TextEditor from 'components/atoms/TextEditor'
import DesignImageEdit from 'components/organisms/editor_parts/form/DesignImageEdit'
import LinkEditor from 'components/molecules/site/edit/LinkEditor'
import WideModal from 'components/organisms/modal/WideModal'
import 'node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// テキスト編集可能なモーダル
class LinkedTextModal extends React.Component {
  render() {
    const props = this.props

    return (
      <WideModal isOpen={props.isOpen || false} toggle={props.toggle}>
        <ModalHeader>{props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">テキスト編集</label>
            <div className="col-sm-10">
              <TextEditor onChangeText={props.onChangeText} />
            </div>
          </div>

          <div className="form-group row">
            <DesignImageEdit onClickImage={props.onClickModalImage} />
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
