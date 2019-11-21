import Vue from 'vue'
import Vuex from "vuex"
//用户信息
import user from './modules/user'
//侧边导航权限
import permission from './modules/permission'
//tab菜单
import tabsview from './modules/tabsview'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission,
    tabsview
  }
})
