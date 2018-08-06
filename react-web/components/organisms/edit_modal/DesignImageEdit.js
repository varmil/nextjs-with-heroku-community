import React from 'react'
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

// 本当は画像パスを帰すようなAPIをサーバに実装して、ここではそのpropsを受け取る
const IMAGE_SRCS = [
  '/static/img/template/flap-banner.jpg',
  '/static/img/template/flap-logo.png',
  'https://dummyimage.com/1140x220/000/fff.png',
  'https://dummyimage.com/500x180/000/fff.png',
  '/static/img/welcome-bg.png',
  '/static/img/logo-blue.png',
  '/static/stub/logo-white.png',
  '/static/img/logo.jpg',
  '/static/stub/p770x405.png',
  '/static/stub/p800x390.png',
  '/static/stub/p1326x860.png',
  '/static/stub/p1626x1530.png'
]

// ロゴやバナーなどリンクできる画像を編集するモーダル
export default class DesignImageEdit extends React.Component {
  static TYPE_EXISTING() {
    return { id: STATE.EXISTING, text: 'ライブラリ' }
  }

  static TYPE_COMMUNE_LIB_IMAGE() {
    return { id: STATE.COMMUNE_LIB_IMAGE, text: 'テンプレート' }
  }

  static TYPE_BACKGROUND_COLOR() {
    return { id: STATE.BACKGROUND_COLOR, text: '背景色' }
  }

  constructor(props) {
    super(props)
    this.state = { toggleState: STATE.EXISTING }
  }

  addSelectedIfMatch(state) {
    return state === this.state.toggleState
  }

  createContents() {
    switch (this.state.toggleState) {
      case STATE.EXISTING:
        // return createExistingImages(IMAGE_SRCS, this.props.onClickImage)
        return (
          <ImageContainer
            srcs={IMAGE_SRCS}
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
              <ImageUploadButton className="mb-3" />
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
