<template>
  <el-row>
    <el-col :span="24">
      <el-menu class="top-navbar" mode="horizontal" text-color="#fff" active-text-color="#fff">
        <!-- 系统标题 -->
        <router-link to="/admin" style="display: table;">
          <el-menu-item index="1" class="title-name">后台管理系统</el-menu-item>
        </router-link>
        <!-- 换肤 -->
        <change-theme class="theme-container"></change-theme>
        <!-- 全屏缩放 -->
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <screenfull class="screenfull "></screenfull>
        </el-tooltip>
        <!-- 管理者信息 -->
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar">
            <div class="username-wrapper">
              <span class="user-name">{{username}}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class='inlineBlock' to="/">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
            </router-link>
            <router-link class='inlineBlock' to="/">
              <el-dropdown-item>
                修改头像
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="logout">
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import ChangeTheme from '@/components/change-theme'
  import Screenfull from '@/components/screenfull'
  export default{
    data(){
      return {
      }
    },
    components:{
      ChangeTheme,
      Screenfull
    },
    computed: {
      ...mapGetters([
        'username',
        'avatar'
      ])
    },
    methods:{
      ...mapActions({
        userLogout: 'logout'
      }),
      logout(){
        this.userLogout
        sessionStorage.removeItem('UserInfo')
        location.reload()
      }
    }
  }
</script>

<style lang="stylus">
.top-navbar {
  position:fixed;
  width:100%;
  z-index:10;
  border-bottom:none !important;
}
.top-navbar /deep/ .el-menu-item {
  font-size 20px
  &:hover {
    background-color:transparent;
  }
  &:focus {
    background-color:transparent;
  }
}
.theme-container {
  position absolute
  top 15px
  right 140px
  color #fff
  font-size 24px
  cursor pointer
}
.top-navbar /deep/ .screenfull {
  position: absolute;
  top: 15px;
  right:113px;
  font-size 24px
}
.avatar-container {
  position: absolute;
  top: 15px;
  right: 20px;
  color: #fff;
  .avatar-wrapper {
    cursor: pointer;
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .username-wrapper {
      display: inline-block;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
