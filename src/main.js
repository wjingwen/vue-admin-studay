import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from "@/store/index"
import '@/directive/index'
// 全局图标
import './icons'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.path == '/login'){
    next()
  }else{
    let userinfo = sessionStorage.getItem('UserInfo')
    if (!userinfo) {
      next({ path: '/login' })
    } else {
      if(store.getters.permissions == 0){
        //获取用户信息重新设置store，防止刷新就消失
         userinfo = sessionStorage.getItem('UserInfo')
         userinfo = JSON.parse(userinfo)
         store.dispatch('getuserinfo',userinfo).then(resp => {
           const permissions = resp.permissions
           store.dispatch('GenerateRoutes', { permissions }).then(() => {
             // 动态添加可访问路由表
             router.addRoutes(store.getters.addRouters)
             // console.log(to)
             // console.log({...to})
             // hack方法 确保addRoutes已完成，set the replace: true so the navigation will not leave a history record
             // 这样我们就可以简单的通过 `next(to)` 巧妙的避开之前的那个问题了。这行代码重新进入 `router.beforeEach` 这个钩子，这时候再通过 `next()` 来释放钩子，就能确保所有的路由都已经挂载完成了。
             next({
               ...to,
               replace: true
             })
           })
         }).catch(() => {
           store.dispatch('logout').then(() => {
             next('/login')
           })
        })
      }else{
        next()
      }
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
