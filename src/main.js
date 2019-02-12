import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
import './plugins/echarts.js'
import store from './plugins/vuex'
import moment from 'vue-moment'


Vue.config.productionTip = false

Vue.use(moment)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
