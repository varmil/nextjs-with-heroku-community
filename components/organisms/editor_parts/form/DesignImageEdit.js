import React from 'react'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import {
  MultipleToggleGroup,
  MultipleToggle
} from 'components/atoms/MultipleToggle'
import { createExistingImages } from 'components/molecules/site/edit/ImageShower'

const STATE = {
  EXISTING: 0,
  COMMUNE_LIB: 1
}

// 本当は画像パスを帰すようなAPIをサーバに実装して、ここではそのpropsを受け取る
const IMAGE_SRCS = [
  'https://dummyimage.com/1140x220/000/fff.png',
  'https://dummyimage.com/500x180/000/fff.png',
  '/static/stub/logo-blue.png',
  '/static/stub/logo-white.png',
  '/static/stub/logo.png',
  '/static/stub/p770x405.png',
  '/static/stub/p800x390.png',
  '/static/stub/p1326x860.png',
  '/static/stub/p1626x1530.png'
]

// ロゴやバナーなどリンクできる画像を編集するモーダル
export default class DesignImageEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = { linkState: STATE.EXISTING }
  }

  addSelectedIfMatch(state) {
    return state === this.state.linkState
  }

  render() {
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
                      linkState: STATE.EXISTING
                    })
                  }
                  text="ライブラリ"
                />
                <MultipleToggle
                  selected={this.addSelectedIfMatch(STATE.COMMUNE_LIB)}
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      linkState: STATE.COMMUNE_LIB
                    })
                  }
                  text="テンプレート"
                />
              </MultipleToggleGroup>
            </div>
          </div>
          {createExistingImages(IMAGE_SRCS, this.props.onClickImage)}
        </div>
      </React.Fragment>
    )
  }
}
