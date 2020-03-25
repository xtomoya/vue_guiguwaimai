// 入口js

import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'

import './mock/mockServer'  //像导入css一样，这里导入mockServer.js即可

//注册全局组件标签
Vue.component(Button.name,Button)

new Vue({
    el:'#app',
    render:h => h(App),
    router,
    store
})