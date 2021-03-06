import App, { Container } from 'next/app'
import React from 'react'

// MUI https://github.com/mui-org/material-ui/tree/master/examples/nextjs
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from 'utils/getPageContext'

// REDUX
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import withAppLayout from 'components/templates/withAppLayout'
import createStore from 'store'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import initialize from 'utils/initialize'

// TOASTR
import ReduxToastr from 'react-redux-toastr'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    // user AUTHENTICATE
    initialize(ctx)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }
    return { pageProps }
  }

  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
            tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider store={store}>
              <React.Fragment>
                <ReduxToastr
                  timeOut={2400}
                  newestOnTop={false}
                  preventDuplicates
                  position="bottom-center"
                  transitionIn="fadeIn"
                  transitionOut="fadeOut"
                  progressBar
                />

                {/* Pass pageContext to the _document though the renderPage enhancer
                  to render collected styles on server side. */}
                <Component pageContext={this.pageContext} {...pageProps} />
              </React.Fragment>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

// const ReduxApp = withRedux(createStore)(withReduxSaga({ async: true })(MyApp))
// export default withAppLayout(ReduxApp)

const Layouted = withAppLayout(MyApp)
export default withRedux(createStore)(withReduxSaga({ async: false })(Layouted))
