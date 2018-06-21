import React from 'react'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => setTimeout(() => NProgress.done(), 2000)
Router.onRouteChangeError = () => NProgress.done()

const LoadingHeader = () => (
  <React.Fragment>
    <Head>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
    </Head>

    <style global jsx>{`
      #nprogress .bar {
        height: 6px;
        background: #27c4f5
          linear-gradient(to right, #27c4f5, #a307ba, #fd8d32, #70c050, #27c4f5);
        background-size: 500%;
        animation: 2s linear infinite barprogress, 0.3s fadein;
        width: 100%;
      }

      @keyframes barprogress {
        0% {
          background-position: 0% 0;
        }
        to {
          background-position: 125% 0;
        }
      }

      #nprogress .peg {
        display: none;
      }

      #nprogress .spinner-icon {
        z-index: 5000;
        // border-top-color: transparent;
        // border-left-color: transparent;
      }
    `}</style>
  </React.Fragment>
)

export default LoadingHeader
