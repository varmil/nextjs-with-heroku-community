import React from 'react'
import CategoryListModal from 'components/templates/edit_modal/CategoryListModal'
import IconModal from 'components/templates/edit_modal/IconModal'
import ImageModal from 'components/templates/edit_modal/ImageModal'
import TextBGImageModal from 'components/templates/edit_modal/TextBGImageModal'
import TextModal from 'components/templates/edit_modal/TextModal'

// string - class mapping
const CLASSES = {
  CategoryListModal,
  TextBGImageModal
}

// ここは汎用Modal処理のみ書いておいて、外からどのモーダルを展開するか渡す感じ
// modalName : string       data属性の文字列から展開Modalを決定
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
              {...this.props}
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