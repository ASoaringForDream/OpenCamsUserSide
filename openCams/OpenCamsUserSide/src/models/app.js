import { history } from 'umi'
import { stringify } from 'qs'
import store from 'store'
import { queryLayout } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import config from 'config'
import { message } from 'antd'
const { pathToRegexp } = require("path-to-regexp")

const { logoutUser, queryUserInfo } = api

const goDashboard = () => {
  if (pathToRegexp(['/', '/login']).exec(window.location.pathname)) {
    history.push({
      pathname: '/dashboard',
    })
  }
}

const app = {
  namespace: 'app',
  state: {
    roleList: [],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *query(_, { call, select }) {
      const { locationPathname } = yield select(_ => _.app)
      const { errno, data } = yield call(queryUserInfo)
      if (!errno) {
        store.set('user', data)
        goDashboard()
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        history.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },
    *signOut(_, { call, put }) {
      const { errno, errmsg } = yield call(logoutUser)
      if (!errno) {
        store.set('user', {})
        yield put({ type: 'query' })
      } else {
        message.error(errmsg)
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}

export default app
