import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { store }  from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

import Signup from './components/sign-up.vue'

const routes = [
  { path: '/', component: App },
  { path: '/sign-up', component: Signup}
]

const router = new VueRouter({
  base: __dirname,
  routes: routes
})

new Vue({
  el: '#app',
  store: store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
