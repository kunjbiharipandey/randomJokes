// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin, BTabs, BTab } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.component('b-tabs', BTabs)
Vue.component('b-tab', BTab)
Vue.config.productionTip = false
// Import Bootstrap and BootstrapVue CSS files (order is important)

// Make BootstrapVue available throughout your project
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  BootstrapVue,
  IconsPlugin,
  components: { App },
  template: '<App/>'
})
