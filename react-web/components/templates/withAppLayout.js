import React, { Component } from 'react'
import Head from 'next/head'
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

    loadWebfontIfSet() {
      const { common } = this.props.store.getState().site || {}
      if (!common || !common.fontFamily || !common.fontFamily.cssName) {
        return null
      }
      return (
        <link
          href={`https://fonts.googleapis.com/earlyaccess/${
            common.fontFamily.cssName
          }.css`}
          rel="stylesheet"
        />
      )
    }

    setWebfontFamilyIfSet() {
      const { common } = this.props.store.getState().site || {}
      return common.fontFamily
        ? `'${common.fontFamily.familyName}' !important`
        : 'inherit'
    }

    render() {
      return (
        <React.Fragment>
          <Head>{this.loadWebfontIfSet()}</Head>

          <LoadingHeader />
          <ComposedComponent {...this.props} />

          <style jsx global>{`
            body {
              font-family: ${this.setWebfontFamilyIfSet()};
            }
          `}</style>
        </React.Fragment>
      )
    }
  }

  return AppLayout
}
