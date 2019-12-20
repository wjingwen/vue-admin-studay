<template>
  <div class="edit_container">
        <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
        </quill-editor>
        <button>保存</button>
    </div>
</template>

<script>
  import Vue from 'vue'
  import VueQuillEditor from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  Vue.use(VueQuillEditor)
  export default{
    data(){
      return{
        editorOption:{},
        content:''
      }
    }
  }
</script>
<style scoped>
</style>
