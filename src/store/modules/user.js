//定义常量
const SET_NAME = 'SET_NAME'
const SET_AGE = 'SET_AGE'
const SET_AVATAR = 'SET_AVATAR'
const SET_PERMISSIONS = 'SET_PERMISSIONS'

const user = {
  state:{
    username: '',
    avatar: '',
    permissions: ''
  },
  mutations: {
    [SET_NAME](state, username) {
      state.username = username
    },
    [SET_AVATAR](state, avatar) {
      state.avatar = avatar
    },
    [SET_PERMISSIONS](state, permissions) {
      state.permissions = permissions
    }
  },
  actions:{
    login({ commit }, userInfo){
      commit(SET_AVATAR, userInfo.avatar)
      commit(SET_NAME, userInfo.username)
      commit(SET_PERMISSIONS, userInfo.permissions)
    },
    // 用户退出登录
    logout({ commit }) {
      commit(SET_AVATAR, '')
      commit(SET_NAME, '')
      commit(SET_PERMISSIONS, '')
    },
    getuserinfo({ commit }, userInfo){
      commit(SET_AVATAR, userInfo.avatar)
      commit(SET_NAME, userInfo.username)
      commit(SET_PERMISSIONS, userInfo.permissions)
      return userInfo
    }
  },
  getters: {
    username: state => state.username,
    avatar: state => state.avatar,
    permissions: state => state.permissions
  }
}
export default user
