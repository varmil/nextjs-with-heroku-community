import es6promise from 'es6-promise'
import 'isomorphic-unfetch' /* global fetch */
es6promise.polyfill()

const HTTP_SCHEMA = 'http://'
const LOCALHOST = 'localhost'
const PRODUCTION_SERVER = '35.200.99.144'
const PORT = 5000

export default class API {
  static getBaseURL() {
    // server
    const isServer = typeof window === 'undefined'
    if (isServer) return `${HTTP_SCHEMA}${LOCALHOST}:${PORT}`

    // browser
    if (process.env.NODE_ENV === 'production') {
      return `${HTTP_SCHEMA}${PRODUCTION_SERVER}:${PORT}`
    } else {
      return `${HTTP_SCHEMA}${LOCALHOST}:${PORT}`
    }
  }

  static async fetch(url, jwtToken, options = {}) {
    try {
      const newOptions = {
        ...options,
        headers: {
          Authorization: jwtToken || ''
        }
      }
      return await fetch(`${API.getBaseURL()}${url}`, newOptions)
    } catch (e) {
      console.error(e)
    }
  }

  static async post(url, jsonData, jwtToken, options = {}) {
    try {
      const newOptions = {
        ...options,
        method: 'POST',
        headers: {
          Authorization: jwtToken || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      }
      return await fetch(`${API.getBaseURL()}${url}`, newOptions)
    } catch (e) {
      console.error(e)
    }
  }

  static isJson(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }
}
