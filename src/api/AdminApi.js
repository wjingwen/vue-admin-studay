import {request} from './ApiConfig'

const AdminServer = {
  // 登录
  Login (params) {
    return request({
      method: 'Post',
      url: '/localhost:8080/login',
      params: params
    })
  },

}
export default AdminServer
