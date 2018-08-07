import axios from 'axios'
import env from '/.env.json'

const HTTP_SCHEMA = 'http://'
const HTTPS_SCHEMA = 'https://'
const SERVER_LOCALHOST = 'localhost'
const DEV_SERVER = env.DEV_API_SERVER_URL || 'localhost'
const PRODUCTION_SERVER = env.PROD_API_SERVER_URL || 'apicommune.dayone.jp'
const PORT = 5000

export const getBaseDomain = () => {
  // server
  const isServer = typeof window === 'undefined'
  if (isServer) return `${HTTP_SCHEMA}${SERVER_LOCALHOST}:${PORT}`

  // browser
  if (process.env.NODE_ENV === 'production') {
    // use domain and SSL
    return `${HTTPS_SCHEMA}${PRODUCTION_SERVER}`
  } else {
    return `${HTTP_SCHEMA}${DEV_SERVER}:${PORT}`
  }
}

const getBaseURL = () => {
  return getBaseDomain()
}

// serverではシングルトンなので注意
const instance = axios.create({
  baseURL: getBaseURL(),
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

  static isJson(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }
}
