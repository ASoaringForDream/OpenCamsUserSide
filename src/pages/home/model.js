import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { querySwiper, queryCams } = api

const login = modelExtend(pageModel, {
  namespace: 'home',

  state: {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    swiperList: [],
    camList: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/home').exec(location.pathname)) {
          const payload = location.query
          dispatch({
            type: 'querySwiper'
          })
          dispatch({
            type: 'queryCams',
            payload
          })
        }
      })
    },
  },
  effects: {
    *querySwiper(_, { put, call }) {
      const { errno, data } = yield call(querySwiper)
      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            swiperList: data.data
          }
        })
      }
    },
    *queryCams({ payload }, { select, put, call }) {
      const { pagination } = yield select(app => app.home)
      const { errno, errmsg, data } = yield call(queryCams, {
        search: payload?.search,
        mainTag: payload?.mainTag,
        tag: payload?.tag,
        city: payload?.city,
        country: payload?.country,
        state: payload?.state,
        current: Number(payload?.page) || pagination.current || 1,
        pageSize: Number(payload?.pageSize) || pagination.pageSize || 10,
      })
      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            camList: data.data,
            pagination: {
              current: Number(payload?.page) || pagination.current || 1,
              pageSize: Number(payload?.pageSize) || pagination.pageSize || 10,
              total: data.total,
            },
          }
        })
      }else {
        message.error(errmsg)
      }
    },
  },
})


export default login