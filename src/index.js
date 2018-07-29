import Vue from 'vue'
import App from './app.vue'
import router from './router'

import './assets/stylus/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App),
  router
}).$mount(root)
