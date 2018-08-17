import React, { Component } from 'react'
import Head from 'next/head'
import LoadingHeader from 'components/organisms/LoadingHeader'
import URL from 'constants/URL'

export default function withAppLayout(ComposedComponent) {
  class AppLayout extends Component {
    static async getInitialProps(props) {
      let pageProps = {}

      if (ComposedComponent.getInitialProps) {
        pageProps = await ComposedComponent.getInitialProps(props)
      }

      const isAdminPage = props.ctx.pathname.startsWith(URL.ADMIN_BASE_SLUG)
      return { ...pageProps, isAdminPage }
    }

    // 管理者画面フォントや、そもそもデフォルト指定の場合時などは規定フォント
    shouldUseDefaultFont() {
      const { store, isAdminPage } = this.props
      const { common } = store.getState().site || {}
      return isAdminPage || (!common || !common.fontFamily)
    }

    loadWebfontIfSet() {
      const { store } = this.props
      const { common } = store.getState().site || {}

      if (this.shouldUseDefaultFont()) return null
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
      const { store } = this.props
      const { common } = store.getState().site || {}

      return this.shouldUseDefaultFont()
        ? 'inherit'
        : `'${common.fontFamily.familyName}' !important`
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
