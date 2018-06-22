import React, { Component } from 'react'
import Modal from 'reactstrap/lib/Modal'

const modalStyle = {
  maxWidth: '90%'
}

function create(WrappedComponent) {
  return class hoc extends Component {
    render() {
      const props = this.props
      const customStyle = props.style
        ? { ...props.style, ...modalStyle }
        : modalStyle

      return <WrappedComponent {...props} centered={true} style={customStyle} />
    }
  }
}

const WideModal = create(Modal)
export default WideModal
