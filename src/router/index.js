import Vue from 'vue'
import Router from 'vue-router'
import signup from '../components/sign-up'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'signup',
            component: signup
        }
    ]
})