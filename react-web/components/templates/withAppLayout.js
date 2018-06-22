import React, { Component } from 'react'
import LoadingHeader from 'components/organisms/LoadingHeader'

export default function withAppLayout(ComposedComponent) {
  class AppLayout extends Component {
    render() {
      return (
        <React.Fragment>
          <LoadingHeader />
          <ComposedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }

  return AppLayout
}
