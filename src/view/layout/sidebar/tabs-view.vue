<template>
  <div class="tabs-view-container">
    <span class="leftico" @click="leftmove"><i class="el-icon-d-arrow-left"></i></span>
    <div class="tabmunes" id="tabmunes">
        <div class="childmeuns" id="childmeuns">
          <router-link class="tags-view-item" :class="isActive(tag) ? 'active' : '' " v-for="(tag, index) in visitedTabsView" :to="tag.path" :key="index">
            <el-tag v-if="index == 0"
              :disable-transitions="false"
              @close.prevent.stop="handleClose(tag)">
              {{tag.name}}
            </el-tag>
            <el-tag v-else
            closable
            :disable-transitions="false"
            @close.prevent.stop="handleClose(tag)">
            {{tag.name}}
          </el-tag>
          </router-link>
        </div>
    </div>
   <span class="rightico" @click="rightmove"><i class="el-icon-d-arrow-right"></i></span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentindex:0,
    }
  },
  created() {
    this.addTabsView()
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'visitedTabsView'
    ])
  },
  methods: {
    ...mapActions([
      'addVisitedTabsView',
      'delVisitedTabsView'
    ]),
    addTabsView() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.addVisitedTabsView(this.generateRoute())
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    handleClose(tag) {
      this.delVisitedTabsView(tag).then((tags) => {
        // 如果关闭的是当前显示的页面，就去到前一个 tab-view 页面
        if (this.isActive(tag)) {
          const lastTag = tags.slice(-1)[0]
          // 前一个 tab-view 页面存在，就跳；不存在就到首页
          if (lastTag) {
            this.$router.push(lastTag.path)
          } else {
            this.$router.push('/admin')
          }
        }
      })
    },
    leftmove(){
      let items = document.querySelectorAll('.tags-view-item')
      let item = 0
      items[item].scrollIntoView({ behavior: "smooth",  block: "end",  inline: "end", })
    },
    rightmove(){
      let items = document.querySelectorAll('.tags-view-item')
      let item = this.currentindex
      items[items.length-1].scrollIntoView({ behavior: "smooth",  block: "end",  inline: "end", })
    },
    //移动tab
    clickmovetab(){
      let box = document.getElementById('tabmunes')
      let obj = document.getElementById('childmeuns')
      let items = document.querySelectorAll('.tags-view-item')
      if(obj.offsetWidth>box.offsetWidth){
        //获取当前选中值的宽度
        items.forEach(function(e,index){
          if(e.className != 'tags-view-item'){
             e.scrollIntoView({ behavior: "smooth",  block: "end",  inline: "end", })
          }
        })
      }
    }
  },
  watch: {
    $route() {
      this.addTabsView()
      this.$nextTick(() => {
        this.clickmovetab()
      })
    },
  }
}
</script>

<style lang="stylus">
.tabs-view-container
  height 40px
  padding 5px
  border-bottom 1px solid #dfdfdf
  position relative
  overflow hidden
  .tags-view-item
    .el-tag
      margin 0 3px
      &:first-child
        margin-left 0
        margin-bottom 3px
    &.active
      .el-tag
        background-color #00b4aa
        color #fff
        .el-icon-close
          color #fff
        &:before
          position relative
          content ''
          background #fff
          display inline-block
          width 6px
          height 6px
          border-radius 50%
          margin-right 2px
  .tabmunes
    width auto
    white-space nowrap
    overflow hidden
    position absolute
    left 30px
    height 34px
    right 30px
  .childmeuns
    display inline-block
    transition-duration 500ms
  .leftico
    font-size 20px
    position absolute
    left 0
    cursor pointer
    width 30px
    height 34px
    background #FFFFFF
    text-align center
    line-height 34px
  .rightico
    font-size 20px
    position absolute
    right 0
    cursor pointer
    width 30px
    height 34px
    background #FFFFFF
    text-align center
    line-height 34px
</style>
