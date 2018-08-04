import axios from 'axios'
import env from '/.env.json'

const HTTP_SCHEMA = 'http://'
const LOCALHOST = env.DEV_API_SERVER_URL || 'localhost'
const PRODUCTION_SERVER = env.PROD_API_SERVER_URL || '35.200.117.204'
const PORT = 5000

export const getBaseDomain = () => {
  // server
  const isServer = typeof window === 'undefined'
  if (isServer) return `${HTTP_SCHEMA}${LOCALHOST}`

  // browser
  if (process.env.NODE_ENV === 'production') {
    return `${HTTP_SCHEMA}${PRODUCTION_SERVER}`
  } else {
    return `${HTTP_SCHEMA}${LOCALHOST}`
  }
}

const getBaseURL = () => {
  return `${getBaseDomain()}:${PORT}`
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
