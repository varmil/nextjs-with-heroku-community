import React from 'react'
import WideModal from 'components/organisms/modal/WideModal'
import ModalFooterSaveCancel from 'components/molecules/edit_modal/ModalFooterSaveCancel'

export default function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      // use ref for easy access to modal state
      this.myRef = React.createRef()
    }

    render() {
      const props = this.props

      return (
        <WideModal
          isOpen={this.props.isOpen || false}
          toggle={this.props.toggle}
        >
          <WrappedComponent ref={this.myRef} {...props} />

          <ModalFooterSaveCancel
            onSave={() => {
              props.toggle() // close modal
              props.onSave(this.myRef.current.state) // save data
            }}
            onCancel={props.toggle}
          />
        </WideModal>
      )
    }
  }
}
