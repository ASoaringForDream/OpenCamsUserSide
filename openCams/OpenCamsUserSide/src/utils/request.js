import axios from 'axios'
import { cloneDeep } from 'lodash'
import { message } from 'antd'
import qs from 'qs'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
const { parse, compile } = require("path-to-regexp")

const { CancelToken } = axios
window.cancelRequest = new Map()

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config.headers.token = window.localStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.defaults.withCredentials = true

export default function request(options) {
  let { data, url, method } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = parse(url)
    url = compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url = url
  if(method === 'GET') {
    const query = qs.stringify(data)
    options.url = `${options.url}?${query}`
    delete options.data
  }
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response

      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      })
    })
    .catch(error => {
      const { response, message } = error

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        }
      }

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })
}
