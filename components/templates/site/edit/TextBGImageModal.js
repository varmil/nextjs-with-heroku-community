import React from 'react'
import update from 'immutability-helper'
import { ModalHeader, ModalBody } from 'reactstrap'
import TextEditor from 'components/atoms/TextEditor'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import DesignImageEdit from 'components/organisms/editor_parts/form/DesignImageEdit'
import 'node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// テキスト編集可能なモーダル
class LinkedTextModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentState: props.contentState,
      src: props.src
    }
  }

  onChangeText(json, index) {
    this.setState(
      update(this.state, {
        contentState: { $set: json }
      })
    )
  }

  onClickImage(src, index) {
    this.setState(
      update(this.state, {
        src: { $set: src }
      })
    )
  }

  render() {
    const state = this.state
    const props = this.props

    return (
      <React.Fragment>
        <ModalHeader>{props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-2 col-form-label">テキスト編集</label>
            <div className="col-10">
              <TextEditor
                value={state.contentState}
                onChangeText={this.onChangeText.bind(this)}
              />
            </div>
          </div>

          <div className="form-group row">
            <DesignImageEdit onClickImage={this.onClickImage.bind(this)} />
          </div>
        </ModalBody>
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(LinkedTextModal)
