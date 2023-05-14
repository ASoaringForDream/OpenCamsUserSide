import { message } from 'antd'
import api from 'api'
const { pathToRegexp } = require("path-to-regexp")

const { loginUser, addUser } = api

const login = {
  namespace: 'login',

  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/login').exec(location.pathname)) {
        }
      })
    },
  },
  effects: {
    *login({ payload }, { put, call }) {
      const { errno, errmsg } = yield call(loginUser, payload)
      if(!errno) {
        yield put({
          type: 'app/query'
        })
        message.success('登录成功')
      }else {
        message.error(errmsg)
      }
    },
    *addUser({ payload, cb }, { call }) {
      const { errno, errmsg } = yield call(addUser, payload)
      if(!errno) {
        cb && cb()
        message.success('创建成功')
      }else {
        message.error(errmsg)
      }
    }
  },
}


export default login