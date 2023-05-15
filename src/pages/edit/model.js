import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import api from 'api'
import store from 'store'
import { model } from 'utils/model'

const { editUser, queryUserInfo } = api

export default modelExtend(model, {
  namespace: 'edit',
  state: {
    count: 1
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
  effects: {
    *editUser({ payload, cb }, { call, put }) {
      const { errno, errmsg } = yield call(editUser, payload)

      if(!errno) {
        const { errno, data } = yield call(queryUserInfo)
        if (!errno) {
          store.set('user', data)
        }
        cb && cb()
        message.success('修改成功')
      } else {
        message.error(errmsg)
      }
    }
  },
})
