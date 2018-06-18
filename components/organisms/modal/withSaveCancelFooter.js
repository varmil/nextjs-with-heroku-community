import React from 'react'
import WideModal from 'components/organisms/modal/WideModal'
import ModalFooterSaveCancel from 'components/molecules/site/edit/ModalFooterSaveCancel'

export default function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      const props = this.props
      return (
        <WideModal
          isOpen={this.props.isOpen || false}
          toggle={this.props.toggle}
        >
          <WrappedComponent {...props} />

          <ModalFooterSaveCancel
            onSave={() => {
              props.toggle() // close modal
              props.onSave(this.state) // save data
            }}
            onCancel={props.toggle}
          />
        </WideModal>
      )
    }
  }
}
