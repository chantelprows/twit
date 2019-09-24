import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        username: "",
        password: ""
    },

    getters: {

    },

    mutations: {
        setUsername: (state, str) => {
            state.username = str
        },
        setPassword: (state, str) => {
            state.password = str
        }
    },

    actions: {
        fetchLogin: ({state}) => {
            // login(state.username, state.password) LOGIN
            console.log(state.username, state.password)
        }
    }
});