import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { querySwiper, queryCams } = api

const login = modelExtend(pageModel, {
  namespace: 'home',

  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/home').exec(location.pathname)) {
          dispatch({
            type: 'querySwiper'
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
      const { pagination } = yield select(app => app.cam)
      const { errno, errmsg, data } = yield call(queryCams, {
        id: payload?.id,
        tit: payload?.tit,
        mainTag: payload?.mainTag,
        current: Number(payload?.page) || pagination.current || 1,
        pageSize: Number(payload?.pageSize) || pagination.pageSize || 10,
      })

      if(!errno) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload?.page) || pagination.current || 1,
              pageSize: Number(payload?.pageSize) || 10,
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