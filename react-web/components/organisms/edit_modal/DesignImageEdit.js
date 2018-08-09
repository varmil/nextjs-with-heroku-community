import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { AppAdminLibrary } from 'constants/ActionTypes'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import {
  MultipleToggleGroup,
  MultipleToggle
} from 'components/atoms/MultipleToggle'
import ColorPicker from 'components/molecules/ColorPicker'
import { ImageContainer } from 'components/molecules/edit_modal/ImageShower'

const STATE = {
  EXISTING: 0,
  COMMUNE_LIB_IMAGE: 1,
  BACKGROUND_COLOR: 2
}

// ロゴやバナーなどリンクできる画像を編集するモーダル
class DesignImageEdit extends React.Component {
  static TYPE_EXISTING() {
    return { id: STATE.EXISTING, text: 'ライブラリ' }
  }

  static TYPE_COMMUNE_LIB_IMAGE() {
    return { id: STATE.COMMUNE_LIB_IMAGE, text: 'テンプレート' }
  }

  static TYPE_BACKGROUND_COLOR() {
    return { id: STATE.BACKGROUND_COLOR, text: '背景色' }
  }

  state = {
    nowUploading: false
  }

  constructor(props) {
    super(props)
    this.state = { toggleState: STATE.EXISTING }
  }

  // 適当にここでFETCH
  componentDidMount = () => {
    this.props.dispatch(createAction(AppAdminLibrary.FETCH_LIST_REQUEST)())
  }

  // 問答無用でサーバへファイルアップロード
  onDrop = files => {
    console.log(files)
    const { dispatch } = this.props

    this.setState({ ...this.state, nowUploading: true })

    const successCb = res => {
      this.setState({ ...this.state, nowUploading: false })
      // UPLOAD成功後にFETCH
      dispatch(createAction(AppAdminLibrary.FETCH_LIST_REQUEST)())
    }
    dispatch(createAction(AppAdminLibrary.SAVE_REQUEST)({ files, successCb }))
  }

  addSelectedIfMatch(state) {
    return state === this.state.toggleState
  }

  createContents() {
    const { library } = this.props
    switch (this.state.toggleState) {
      case STATE.EXISTING:
        return (
          <ImageContainer
            srcs={library}
            selectedSrc={this.props.selectedImgSrc}
            onClick={this.props.onClickImage}
          />
        )
      case STATE.COMMUNE_LIB_IMAGE:
        return null
      case STATE.BACKGROUND_COLOR:
        return (
          <ColorPicker
            onClick={this.props.onClickBGColor}
            color={this.props.backgroundColor}
          />
        )
    }
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <label className="col-2 col-form-label">デザイン編集</label>
        <div className="col-10">
          <div className="row">
            <div className="col-6">
              <ImageUploadButton
                className="mb-3"
                onDrop={this.onDrop}
                nowUploading={this.state.nowUploading}
              />
            </div>
            <div className="ml-auto mr-5">
              <MultipleToggleGroup>
                <MultipleToggle
                  selected={this.addSelectedIfMatch(STATE.EXISTING)}
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      toggleState: STATE.EXISTING
                    })
                  }
                  text={DesignImageEdit.TYPE_EXISTING().text}
                />
                <MultipleToggle
                  selected={this.addSelectedIfMatch(props.secondToggleType.id)}
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      toggleState: props.secondToggleType.id
                    })
                  }
                  text={props.secondToggleType.text}
                />
              </MultipleToggleGroup>
            </div>
          </div>

          {this.createContents()}
        </div>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  library: state.app.adminLibrary.item
}))(DesignImageEdit)
