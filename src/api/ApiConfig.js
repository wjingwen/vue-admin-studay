import axios from 'axios'
import QS from 'qs'
import router from '@/router'
import { Message } from 'element-ui'

const apiurl = 'http://47.93.49.254:7040'
axios.defaults.baseURL = apiurl
// axios.defaults.baseURL = '/api'

axios.defaults.timeout = 1000
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 对外接口
export function request ({method, url, params}) {
  if (method == 'Get') {
    return get(url, params)
  } else if (method == 'Post') {
    return post(url, params)
  } else if (method == 'Put') {
    return put(url, params)
  }
}

// 封装get方法
function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 封装post方法
function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params)).then(res => {
      console.log(res.data)
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 封装put方法
function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 图片上传方法
export function UploadImgUrl () {
  return apiurl+'/dljy-userservice/external/fileupload'
}

// 请求拦截(请求发出前处理请求)
axios.interceptors.request.use(
  config => {
    // 将token放入header，这里用Vuex把token放在store中，取出
    const userinfo = JSON.parse(sessionStorage.getItem('UserInfo'))
    if (userinfo) {
      const token = userinfo.userToken
      token && (config.headers.Authorization = token)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器（处理响应数据）
axios.interceptors.response.use(function (response) {
  if (response.status == '200') {
    if (response.data.statusCode == 1001 || response.data.statusCode == 1002) {
      Message.error(response.data.message)
    	router.push('/login')
    }
  } else {
    Message.error('当前请求' + response.status)
    router.push('/login')
  }
  return response
}, function (error) {
  if (error.response) {
    return error.response
  } else {
    Message.error('请求超时，请刷新页面重试')
  }
})
