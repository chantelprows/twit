import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        username: "",
        password: "",
        loggedIn: false,
        whichPage: "Login",
        currentUser: {},
        loginErr: false,
        selectedUser: {},
        showFollow: false,





        //DUMMY DATA
        allUsers: [
            {
                username: 'chantelprows',
                name: 'Chantel Prows',
                password: 'password',
                picture: 'https://picsum.photos/510/300?random',
                follows: [
                    {
                        username: 'brodyprows',
                        name: 'Brody Prows',
                        picture: 'https://picsum.photos/510/300?random'
                    }
                ],
                followedBy: [
                    {
                        username: 'brodyprows',
                        name: 'Brody Prows',
                        picture: 'https://picsum.photos/510/300?random'
                    }
                ]
            },
            {
                username: 'brodyprows',
                name: 'Brody Prows',
                password: 'password',
                picture: 'https://picsum.photos/510/300?random',
                follows: [
                    {
                        username: 'chantelprows',
                        name: 'Chantel Prows',
                        picture: 'https://picsum.photos/510/300?random'
                    }
                ],
                followedBy: [
                    {
                        username: 'chantelprows',
                        name: 'Chantel Prows',
                        picture: 'https://picsum.photos/510/300?random'
                    }
                ]
            }
        ],
        personalStatuses: [
            {
                status: "hello",
                attatchment: null,
                username: 'chantelprows',
                name: 'Chantel Prows',
                id: '11',
                timeStamp: 1569616630947
            },
            {
                status: "I am bored today",
                attatchment: 'picture',
                username: 'chantelprows',
                name: 'Chantel Prows',
                id: '11',
                timeStamp: 1569616630947
            }
        ],
        allStatuses: [
            {
                status: "hello",
                attatchment: null,
                username: 'chantelprows',
                name: 'Chantel Prows',
                id: '11',
                timeStamp: 1569616630947
            },
            {
                status: "I am bored today",
                attatchment: 'picture',
                username: 'chantelprows',
                name: 'Chantel Prows',
                id: '11',
                timeStamp: 1569616630947
            },
            {
                status: "sup",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '1',
                timeStamp: 1569616630947
            },
            {
                status: "hey",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '2',
                timeStamp: 1569616630947
            },
            {
                status: "hi",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '3',
                timeStamp: 1569616630947
            },
            {
                status: "whats up",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '4',
                timeStamp: 1569616630947
            },
            {
                status: "hola",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '5',
                timeStamp: 1569616630947
            },
            {
                status: "i like chantel",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '6',
                timeStamp: 1569616630947
            },
            {
                status: "school sux",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '7',
                timeStamp: 1569616630947
            },
            {
                status: "provo sux",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '8',
                timeStamp: 1569616630947
            },
            {
                status: "go byu!!!!!!!!",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '9',
                timeStamp: 1569616630947
            },
            {
                status: "first tweet :)",
                attatchment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '10',
                timeStamp: 1569616630947
            }
        ]
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
        setWhichPage: (state, str) => {
            state.whichPage = str
        },
        setCurrentUser: (state, obj) => {
            state.currentUser = obj
        },
        setSelectedUser: (state, obj) => {
            state.selectedUser = obj
        },
        setLoginErr: (state, bool) => {
            state.loginErr = bool
        },
        setShowFollow: (state, bool) => {
            state.showFollow = bool
        }
    },

    actions: {
        fetchLogin: ({commit, state}) => {
            // login(state.username, state.password) LOGIN

            // for (let i = 0; i < state.allUsers.length; i++) {
            //     if (state.allUsers[i].username === state.username && state.allUsers[i].password === state.password) {
                    commit('setLoggedIn', true)
                    commit('setWhichPage', 'Feed')
                    commit('setLoginErr', false)
            //         break;
            //     }
            // }
            // if (!state.loggedIn) {
            //     commit('setLoginErr', true)
            // }
            commit('setCurrentUser', state.allUsers[0])
            commit('setSelectedUser', state.allUsers[0])
        },
        createUser: ({commit, state}, user) => {
            //createUser

            let uniqueUser = true
            for (let i = 0; i < state.allUsers.length; i++) {
                if (state.allUsers[i].username === user.username) {
                    commit('setLoginErr', true)
                    uniqueUser = false
                    break;
                }
            }
            if (uniqueUser) {
                commit('setCurrentUser', user)
                commit('setLoggedIn', true)
                commit('setWhichPage', 'Feed')
                commit('setLoginErr', false)
            }
        },
        unfollow: ({commit, state}) => {
            for (let i = 0; i < state.currentUser.follows; i++) {
                if (state.currentUser.follows[i].username === state.selectedUser.username) {
                    state.currentUser.follows.splice(i, 1)
                }
            }
        },
        follow: ({commit, state}, obj) => {
            state.currentUser.follows.push(state.selectedUser)
        },
        addStatus: ({commit, state}, obj) => {
            console.log(obj)
            state.allStatuses.push(obj)
            state.personalStatuses.push(obj)
        }
    }
});