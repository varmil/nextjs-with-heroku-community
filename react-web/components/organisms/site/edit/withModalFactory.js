import React from 'react'
import BGColorModal from 'components/templates/edit_modal/BGColorModal'
import CategoryListModal from 'components/templates/edit_modal/CategoryListModal'
import ColorModal from 'components/templates/edit_modal/ColorModal'
import ImageModal from 'components/templates/edit_modal/ImageModal'
import TextBGImageModal from 'components/templates/edit_modal/TextBGImageModal'
import BoxesModal from 'components/templates/edit_modal/BoxesModal'

// string - class mapping
const CLASSES = {
  BGColorModal,
  CategoryListModal,
  ColorModal,
  ImageModal,
  TextBGImageModal,
  BoxesModal
}

// ここは汎用Modal処理のみ書いておいて、外からどのモーダルを展開するか渡す感じ
// WrappedComponent : Component    通常はOverlayComponent
// modalName : string              data属性の文字列から展開Modalを決定
// modalProps : object             Modal展開時の初期値に使用するProps
export default function ppHOC(WrappedComponent, modalName) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = { isOpen: false }
      // create instance with modal name
      this.Modal = CLASSES[modalName]
    }

    onTriggerModal() {
      this.setState({ ...this.state, isOpen: true })
    }

    toggle() {
      this.setState({ ...this.state, isOpen: !this.state.isOpen })
    }

    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            {...this.props}
            onTriggerModal={this.onTriggerModal.bind(this)}
          />

          {/* handle custom modal */}
          {(() => (
            <this.Modal
              // this.propsは有用な情報（ContentState, src, etc.）は含んでないので注意
              {...this.props.modalProps}
              {...this.state}
              toggle={this.toggle.bind(this)}
              // (state) => {}
              // インタフェースっぽく、onSaveを全部のModalが実装していればここで拾える
              // 今どの部分のstateが変更されたのかわからないが、それは上の責務とする
              onSave={this.props.onSave}
            />
          ))()}
        </React.Fragment>
      )
    }
  }
}
