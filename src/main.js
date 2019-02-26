import Vue from 'vue'
import App from './App.vue'
import store from './plugins/vuex.js'
import router from './router.js'
import './plugins/element.js'
import moment from 'vue-moment'


Vue.config.productionTip = false

Vue.use(moment)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
