import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import LinkEditor from 'components/molecules/site/edit/LinkEditor'
import WideModal from 'components/organisms/modal/WideModal'
import { createExistingImages } from 'components/molecules/site/edit/ImageShower'
import 'node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ロゴやバナーなどリンクできる画像を編集するモーダル
class LinkedTextModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    })
  }

  render() {
    const { editorState } = this.state

    return (
      <WideModal isOpen={this.props.isOpen || false} toggle={this.props.toggle}>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">テキスト編集</label>
            <div className="col-sm-10">
              <Editor
                editorState={editorState}
                wrapperClassName="draft-wrapper"
                editorClassName="draft-editor"
                onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
            </div>
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

        <style jsx>{`
          .draft-editor {
            border: 1px solid #f1f1f1;
          }
        `}</style>
      </WideModal>
    )
  }
}

export default LinkedTextModal
