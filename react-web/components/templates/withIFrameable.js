import React, { Component } from 'react'
import IFrame from 'constants/IFrame'

export default function withIFrameable(WrappedComponent) {
  class HOC extends Component {
    onMessage(event) {
      // do nothing if type does not match
      if (event.data.type !== IFrame.EVENT_TYPE_ONSAVE) return
      // 全く同じアクションをこっちでも発火してやる
      this.props.dispatch(event.data.payload)
    }

    componentDidMount() {
      this.listener = this.onMessage.bind(this)
      window.addEventListener('message', this.listener, false)
    }

    componentWillUnmount() {
      window.removeEventListener('message', this.listener)
    }

    render() {
      return (
        <React.Fragment>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }

  return HOC
}
