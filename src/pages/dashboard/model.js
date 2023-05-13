import modelExtend from 'dva-model-extend'
import api from 'api'
import { model } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    count: 1
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathToRegexp('/dashboard').exec(pathname) ||
          pathToRegexp('/').exec(pathname)
        ) {
          // dispatch({ type: 'query' })
          // dispatch({ type: 'queryWeather' })
        }
      })
    },
  },
  effects: {
  },
})
