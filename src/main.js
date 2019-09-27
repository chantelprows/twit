import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { store }  from './store'
import vuetify from './plugins/vuetify'

Vue.use(Vuex)

new Vue({
  el: '#app',
  store: store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
