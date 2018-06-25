import React, { Component } from 'react'
import LoadingHeader from 'components/organisms/LoadingHeader'

export default function withAppLayout(ComposedComponent) {
  class AppLayout extends Component {
    static async getInitialProps(props) {
      let pageProps = {}

      if (ComposedComponent.getInitialProps) {
        pageProps = await ComposedComponent.getInitialProps(props)
      }

      return { ...pageProps }
    }

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
