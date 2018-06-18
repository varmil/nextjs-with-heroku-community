import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import TextEditor from 'components/atoms/TextEditor'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import DesignImageEdit from 'components/organisms/editor_parts/form/DesignImageEdit'
import LinkEditor from 'components/molecules/site/edit/LinkEditor'
import 'node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// テキスト編集可能なモーダル
class LinkedTextModal extends React.Component {
  render() {
    const props = this.props

    return (
      <React.Fragment>
        <ModalHeader>{props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-2 col-form-label">テキスト編集</label>
            <div className="col-10">
              <TextEditor
                value={props.contentState}
                onChangeText={props.onChangeText}
              />
            </div>
          </div>

          <div className="form-group row">
            <DesignImageEdit onClickImage={props.onClickModalImage} />
          </div>

          <div className="form-group row">
            <label className="col-2 col-form-label">リンク</label>
            <div className="col-10">
              <LinkEditor />
            </div>
          </div>
        </ModalBody>
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(LinkedTextModal)
