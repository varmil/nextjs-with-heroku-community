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
// WrappedComponent : Component    通常はOverlayComponent
// modalName : string              data属性の文字列から展開Modalを決定
// modalProps : object           Modal展開時の初期値に使用するProps
export default function ppHOC(WrappedComponent, modalName) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = { isOpen: false }
      // create instance with modal name
      this.Modal = CLASSES[modalName]
      // console.log('[withModalFactory]', props)
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
              // 有用な情報（ContentState, src, etc.）は含んでないので注意
              // Edit側でconnectしておいて、 mapEditableElements() の際に
              // 「このElementsにはこのProps」みたいに第３引数でPropsを渡すか
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
