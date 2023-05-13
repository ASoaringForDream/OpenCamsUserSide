import store from 'store'
import { i18n } from './config'
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
const { pathToRegexp } = require("path-to-regexp")

dayjs.extend(relativeTime)

export classnames from 'classnames'
export config from './config'
export request from './request'
export { Color } from './theme'

export const languages = i18n ? i18n.languages.map(item => item.key) : []
export const defaultLanguage = i18n ? i18n.defaultLanguage : 'zh'

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export function queryArray(array, key, value) {
  if (!Array.isArray(array)) {
    return
  }
  return array.find(_ => _[key] === value)
}

export function queryBreads(array, path) {
  const result = [{
    icon: 'home',
    name: '首页',
    route: '/dashboard'
  }]
  const pathArr = path.slice(1).split('/').map(i => '/' + i)
  const parent = array.find(i => pathToRegexp(i.route).exec(pathArr[0]))
  parent && result.push(parent)
  if(pathArr.length === 2) {
    const son = parent.children?.find(i => pathToRegexp(i.route).exec(path))
    son && result.push(son)
  }
  return result
}

export function queryAncestors(array, path) {
  const res = []
  const pathArr = path.slice(1).split('/').map(i => '/' + i)
  const parent = array.find(i => pathToRegexp(i.route).exec(pathArr[0]))
  res.push(parent?.id)
  if(pathArr.length === 2) {
    res.push(parent.children.find(i => pathToRegexp(i.route).exec(path))?.id)
  }
  return res
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
export function queryLayout(layouts, pathname) {
  let result = 'public'

  const isMatch = regepx => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathToRegexp(regepx).exec(pathname)
  }

  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true
          break
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true
          break
        }
      }
    }

    if (include && !exclude) {
      result = item.name
      break
    }
  }

  return result
}

export const getPermissionMenus = (menus, roleList) => {
  let result = cloneDeep(menus)
  result = result.filter(i => {
    if(Array.isArray(i.children)) {
      i.children = i.children.filter(i => roleList.includes(i.role))
      return i.children.length > 0
    }
    return roleList.includes(i.role)
  })
  return result
}

export const hasPermission = (menus, pathname, role) => {
  let currMenu = null
  menus.forEach(i => {
    if(Array.isArray(i.children)) {
      i.children.forEach(item => {
        if(item.route === pathname) {
          currMenu = item
        }
      })
    }
    if(i.route === pathname) {
      currMenu = i
    }
  });
  return currMenu ? role.includes(currMenu?.role) : false
}

export const hasRole = (roles) => {
  const user = store.get('user') || {}
  const roleIDs = user?.role_ids?.role_ids || []
  return roles.some(i => roleIDs.includes(i))
}


export function getLocale() {
  return store.get('locale') || defaultLanguage
}

export function setLocale(language) {
  if (getLocale() !== language) {
    dayjs.locale(language === 'zh' ? 'zh-cn' : language)
    store.set('locale', language)
    window.location.reload()
  }
}
