import axios from 'axios'

const HTTP_SCHEMA = 'http://'
const LOCALHOST = 'localhost'
const PRODUCTION_SERVER = '35.200.99.144'
const PORT = 5000

const getBaseURL = () => {
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

const instance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
})

export default class API {
  static async fetch(url, jwtToken, options = {}) {
    if (jwtToken) {
      instance.defaults.headers.common['Authorization'] = jwtToken
    }
    return instance.get(url, options)
  }

  static async post(url, data, jwtToken, options = {}) {
    if (jwtToken) {
      instance.defaults.headers.common['Authorization'] = jwtToken
    }
    return instance.post(url, data, options)
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