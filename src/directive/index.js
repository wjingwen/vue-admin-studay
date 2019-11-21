import Vue from 'vue'
Vue.directive('isbutton', {
  // bind声明周期, 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  bind(el, binding, vnode, oldVnode){
  },
  inserted(el, binding, vnode, oldVnode){
    if(binding.name=='isbutton' && binding.value){
       el.style.display='block'
    }else{
      el.style.display='none'
    }
  },
  update(el, binding, vnode, oldVnode){
    if(binding.name=='isbutton' && binding.value){
       el.style.display='block'
    }else{
      el.style.display='none'
    }
  },
})

Vue.directive('focus', {
  // bind声明周期, 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  bind(el, binding, vnode, oldVnode){
    el.focus()
  },
  inserted(el, binding, vnode, oldVnode){
    if(binding.name=='focus' && binding.value){
       el.focus()
    }
  },
  update(el, binding, vnode, oldVnode){
    if(binding.name=='isbutton' && binding.value){
       el.focus()
    }
  },
})
