import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import store from 'store'
import api from 'api'
import { model } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryCollect, queryHistory } = api

const personal = modelExtend(model, {
  namespace: 'personal',

  state: {
    CollectPagination: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    historyPagination: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    collectList: [],
    historyList: [],
    selectKey: 'collect'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/personal').exec(location.pathname)) {
          const payload = location.query
          if(payload.tab === 'history') {
            dispatch({
              type: 'queryHistory',
              payload
            })
            console.log(123);
            dispatch({
              type: 'updateState',
              payload: {
                selectKey: 'history'
              }
            })
          } else {
            dispatch({
              type: 'queryCollect',
              payload
            })
            dispatch({
              type: 'updateState',
              payload: {
                selectKey: 'collect'
              }
            })
          }
        }
      })
    },
  },
  effects: {
    *queryCollect({ payload }, { select, put, call }) {
      const { CollectPagination } = yield select(app => app.personal)
      const user  = store.get('user')
      const { errno, errmsg, data } = yield call(queryCollect, {
        id: user.id,
        current: Number(payload?.page) || CollectPagination.current || 1,
        pageSize: Number(payload?.pageSize) || CollectPagination.pageSize || 10,
      })
      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            collectList: data.data,
            CollectPagination: {
              current: Number(payload?.page) || CollectPagination.current || 1,
              pageSize: Number(payload?.pageSize) || CollectPagination.pageSize || 10,
              total: data.total,
            },
          }
        })
      }else {
        message.error(errmsg)
      }
    },
    *queryHistory({ payload }, { select, put, call }) {
      const { CollectPagination } = yield select(app => app.personal)
      const user  = store.get('user')
      const { errno, errmsg, data } = yield call(queryHistory, {
        id: user.id,
        current: Number(payload?.page) || CollectPagination.current || 1,
        pageSize: Number(payload?.pageSize) || CollectPagination.pageSize || 10,
      })
      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            historyList: data.data,
            historyPagination: {
              current: Number(payload?.page) || CollectPagination.current || 1,
              pageSize: Number(payload?.pageSize) || CollectPagination.pageSize || 10,
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


export default personal