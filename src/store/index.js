import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        username: "",
        password: "",
        loggedIn: false,
        showSignup: false
    },

    getters: {

    },

    mutations: {
        setUsername: (state, str) => {
            state.username = str
        },
        setPassword: (state, str) => {
            state.password = str
        },
        setLoggedIn: (state, bool) => {
            state.loggedIn = bool
        },
        setShowSignup: (state, bool) => {
            state.showSignup = bool
        }
    },

    actions: {
        fetchLogin: ({commit, state}) => {
            // login(state.username, state.password) LOGIN
            console.log(state.username, state.password)
            commit('setLoggedIn', true)
        }
    }
});