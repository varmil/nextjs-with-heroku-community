import React from 'react'
import update from 'immutability-helper'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import TextEditor from 'components/atoms/TextEditor'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import DesignImageEdit from 'components/organisms/edit_modal/DesignImageEdit'
import OnlyHrefLinkEditor from 'components/molecules/edit_modal/OnlyHrefLinkEditor'

// テキスト編集可能なモーダル。
// src             --> 背景画像
// backgroundColor --> 背景色
// href            --> リンク
class TextBGImageModal extends React.Component {
  constructor(props) {
    super(props)

    // base state
    let initialState = {
      contentState: props.contentState,
      src: props.src,
      backgroundColor: props.backgroundColor
    }
    // optional state
    if (props.href !== undefined) {
      initialState = {
        ...initialState,
        href: props.href || '',
        blank: props.blank || false
      }
    }

    this.state = initialState
  }

  onChangeText(json) {
    this.setState(
      update(this.state, {
        contentState: { $set: json }
      })
    )
  }

  onClickImage(src) {
    this.setState(
      update(this.state, {
        src: { $set: src }
      })
    )
  }

  onClickBGColor(color, colorIndex) {
    this.setState(
      update(this.state, {
        backgroundColor: { $set: color }
      })
    )
  }

  handleChange = name => event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({ [name]: value })
  }

  createOnlyHrefLinkEditorIfNeeded() {
    if (this.props.href === undefined) return null

    return (
      <div className="form-group row">
        <label className="col-2 col-form-label">リンク</label>
        <div className="col-10">
          <OnlyHrefLinkEditor
            href={this.state.href}
            onChangeHref={this.handleChange('href')}
            blank={this.state.blank}
            onChangeBlank={this.handleChange('blank')}
          />
        </div>
      </div>
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
            <DesignImageEdit
              selectedImgSrc={state.src}
              backgroundColor={props.backgroundColor}
              onClickImage={this.onClickImage.bind(this)}
              onClickBGColor={this.onClickBGColor.bind(this)}
              secondToggleType={DesignImageEdit.TYPE_BACKGROUND_COLOR()}
            />
          </div>

          {this.createOnlyHrefLinkEditorIfNeeded()}
        </ModalBody>
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(TextBGImageModal)
