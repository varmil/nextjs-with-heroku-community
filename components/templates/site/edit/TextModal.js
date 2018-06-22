import React from 'react'
import update from 'immutability-helper'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import Input from 'reactstrap/lib/Input'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'

// テキスト編集するモーダル
class TextModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text
    }
  }

  onChange(e) {
    this.setState(
      update(this.state, {
        text: { $set: e.currentTarget.value }
      })
    )
  }

  render() {
    return (
      <React.Fragment>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-2 col-form-label">テキスト</label>
            <div className="col-10">
              <div className="form-group">
                <Input
                  type="text"
                  value={this.state.text}
                  onChange={this.onChange.bind(this)}
                  invalid={this.state.text === ''}
                />
                <FormFeedback>1文字以上入力してください。</FormFeedback>
              </div>
            </div>
          </div>
        </ModalBody>
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(TextModal)
