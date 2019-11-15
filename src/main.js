import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { store }  from './store'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Vuex)
Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: "AIzaSyAGmeVekqrDVN9E2INd1wxa5xHzQ0iLUPA",
  authDomain: "cs340-953c8.firebaseapp.com",
  databaseURL: "https://cs340-953c8.firebaseio.com",
  projectId: "cs340-953c8",
  storageBucket: "cs340-953c8.appspot.com",
  messagingSenderId: "411459467440",
  appId: "1:411459467440:web:459eb7fcb0702f148b2375",
  measurementId: "G-FYL2Q8RKJB"
})

export const db = firebase.firestore()

new Vue({
  el: '#app',
  store: store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


