import { constantRouterMap,asyncRouterMap } from '@/router'
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * 只能判断第一层的权限里面的判断不了
 * @param asyncRouterMap
 * @param routesMap
 */
function filterAsyncRouter(asyncRouterMap, routesMap) {

  const accessedRouters = asyncRouterMap.filter(route => {
    return route.meta.permissionRouter.includes(routesMap)
  })
  return accessedRouters
}

const SET_ROUTERS = 'SET_ROUTERS'

const permission = {
  state: {
    addRouters: '',
    routers: constantRouterMap
  },
  mutations: {
    [SET_ROUTERS](state, routers) {
      state.addRouters = routers
      //组合数组
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, routers) {
      const { permissions: p } = routers
      const routersMap = p
      let accessedRouters = filterAsyncRouter(asyncRouterMap, routersMap)
      commit(SET_ROUTERS, accessedRouters)
    }
  },
  getters: {
    addRouters: state => state.addRouters,
    routers: state => state.routers
  }
}

export default permission
