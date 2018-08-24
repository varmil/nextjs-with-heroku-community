import axios from 'axios'
import env from '/.env.json'

const HTTP_SCHEMA = 'http://'
const HTTPS_SCHEMA = 'https://'
const SERVER_LOCALHOST = 'localhost'
const API_SERVER_PORT = 5000
const WEB_SERVER_PORT = 3000

// APIサーバのURL
const getApiServerDomain = () => {
  // server
  const isServer = typeof window === 'undefined'
  if (isServer) return `${HTTP_SCHEMA}${SERVER_LOCALHOST}:${API_SERVER_PORT}`

  // browser
  if (process.env.NODE_ENV === 'production') {
    // use domain and SSL
    return `${HTTPS_SCHEMA}${env.PROD_API_SERVER_URL}`
  } else {
    return `${HTTP_SCHEMA}${env.DEV_API_SERVER_URL}:${API_SERVER_PORT}`
  }
}

// WEBサーバのURL
export const getWebServerDomain = () => {
  return process.env.NODE_ENV === 'production'
    ? `${HTTPS_SCHEMA}${env.PROD_WEB_SERVER_URL}`
    : `${HTTP_SCHEMA}${env.DEV_WEB_SERVER_URL}:${WEB_SERVER_PORT}`
}

// serverではシングルトンなので注意
const instance = axios.create({
  baseURL: getApiServerDomain(),
  withCredentials: true
})

export default class API {
  static async fetch(url, jwtToken, options = {}) {
    instance.defaults.headers.common['Authorization'] = jwtToken || null
    return instance.get(url, options)
  }

  static async post(url, data, jwtToken, options = {}) {
    instance.defaults.headers.common['Authorization'] = jwtToken || null
    return instance.post(url, data, options)
  }

  static async delete(url, jwtToken, options = {}) {
    instance.defaults.headers.common['Authorization'] = jwtToken || null
    return instance.delete(url, options)
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
