import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import api from 'api'
import store from 'store'
import { model } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryRecommend } = api

export default modelExtend(model, {
  namespace: 'recommend',
  state: {
    count: 1
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/recommend').exec(location.pathname)) {
          const payload = location.query
          dispatch({
            type: 'queryRecommend',
            payload
          })
        }
      })
    },
  },
  effects: {
    *queryRecommend(_, { call, put }) {
      const user = store.get('user')
      const { errno, errmsg, data } = yield call(queryRecommend, {
        id: user.id 
      })

      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            recommend: data
          }
        })
      } else {
        message.error(errmsg)
      }
    }
  },
})