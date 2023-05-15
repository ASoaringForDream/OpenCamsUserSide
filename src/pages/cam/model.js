import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryCam } = api

const Cam = modelExtend(pageModel, {
  namespace: 'cam',

  state: {
    cam: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/cam').exec(location.pathname)) {
          const payload = location.query
          dispatch({
            type: 'queryCam',
            payload
          })
        }
      })
    },
  },
  effects: {
    *queryCam({ payload }, { put, call }) {
      const { errno, errmsg, data } = yield call(queryCam, {
        id: payload?.id,
      })
      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            cam: data.data,
            recommend: data.recommend
          }
        })
      }else {
        message.error(errmsg)
      }
    },
  },
})


export default Cam