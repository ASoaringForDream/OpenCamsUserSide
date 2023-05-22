import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import store from 'store'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryCam, setLike, setDisLike, setCollect } = api

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
      const id = payload?.id || store.get('cid')
      if(!id) {
        return
      }
      const user = store.get('user')
      const { errno, errmsg, data } = yield call(queryCam, {
        id,
        uid: user.id
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
    *setLike({ payload }, { put, call }) {
      const { errno, errmsg } = yield call(setLike, payload)
      if(!errno) {
        yield put({
          type: 'queryCam',
          payload: {
            id: payload.cid
          }
        })
      }else {
        message.error(errmsg)
      }
    },
    *setDisLike({ payload }, { put, call }) {
      const { errno, errmsg } = yield call(setDisLike, payload)
      if(!errno) {
        yield put({
          type: 'queryCam',
          payload: {
            id: payload.cid
          }
        })
      }else {
        message.error(errmsg)
      }
    },
    *setCollect({ payload }, { put, call }) {
      const { errno, errmsg } = yield call(setCollect, payload)
      if(!errno) {
        yield put({
          type: 'queryCam',
          payload: {
            id: payload.cid
          }
        })
      }else {
        message.error(errmsg)
      }
    }
  },
})


export default Cam