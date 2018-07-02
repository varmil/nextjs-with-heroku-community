import es6promise from 'es6-promise'
import 'isomorphic-unfetch' /* global fetch */
es6promise.polyfill()

export default class API {
  static getBaseURL() {
    // server
    const isServer = typeof window === 'undefined'
    if (isServer) return 'localhost:5000'

    // browser
    if (process.env.NODE_ENV === 'production') {
      return '35.200.99.144:5000'
    } else {
      return 'localhost:5000'
    }
  }

  static async fetch(url, options = {}) {
    try {
      return await fetch(`${API.getBaseURL()}${url}`, options)
    } catch (e) {
      console.error(e)
    }
  }

  static async post(url, jsonData = {}, options = {}) {
    try {
      const newOptions = {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      }
      return await fetch(`${API.getBaseURL()}${url}`, newOptions)
    } catch (e) {
      console.error(e)
    }
  }
}
