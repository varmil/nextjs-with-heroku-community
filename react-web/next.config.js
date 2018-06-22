// const webpack = require('webpack')
const withCSS = require('@zeit/next-css')
// module.exports = withCSS({
//   // cssModules: true
// })

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
require('webpack-bundle-analyzer')

module.exports = withBundleAnalyzer(
  withCSS({
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),

    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),

    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    }

    // webpack: (config, options) => {
    //   // this assumes your vendor imports exist in the node_modules directory
    //   config.plugins.push(
    //     new webpack.optimize.CommonsChunkPlugin({
    //       name: 'vendor.js',
    //       minChunks: module => /node_modules/.test(module.resource)
    //     })
    //   )
    //
    //   // Important: return the modified config
    //   return config
    // }
  })
)
