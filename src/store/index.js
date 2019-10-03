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
        showStatus: false,
        selectedHashtag: '',





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
        allStatuses: [
            {
                status: "hello @brodyprows",
                attachment: null,
                username: 'chantelprows',
                name: 'Chantel Prows',
                id: '11',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "I am bored today #nbd",
                attachment: null,
                username: 'chantelprows',
                name: 'Chantel Prows',
                id: '12',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random',
                hashtags: ["#nbd"]
            },
            {
                status: "sup #nbd",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '1',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random',
                hashtags: ['#nbd']
            },
            {
                status: "hey",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '2',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "hi",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '3',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "whats up",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '4',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "hola",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '5',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "i like chantel",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '6',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "school sux",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '7',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "my dog emoji I made",
                attachment: 'https://image.flaticon.com/icons/svg/616/616408.svg',
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '8',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "go byu!!!!!!!!",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '9',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random'
            },
            {
                status: "i love #baseball go #angels :)",
                attachment: null,
                username: 'brodyprows',
                name: 'Brody Prows',
                id: '10',
                timeStamp: 1569616630947,
                image: 'https://picsum.photos/510/300?random',
                hashtags: ['#baseball', '#angels']
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
        },
        setShowStatus: (state, bool) => {
            state.showStatus = bool
        },
        setSelectedHashtag: (state, str) => {
            state.selectedHashtag = str
        },
        setAllStatuses: (state, arr) => {
            state.allStatuses = arr
        }
    },

    actions: {
        fetchLogin: ({commit, state}) => {
            // login(state.username, state.password) LOGIN

            for (let i = 0; i < state.allUsers.length; i++) {
                if (state.allUsers[i].username === state.username && state.allUsers[i].password === state.password) {
                    commit('setLoggedIn', true)
                    commit('setWhichPage', 'Feed')
                    commit('setLoginErr', false)
                    commit('setCurrentUser', state.allUsers[i])
                    commit('setSelectedUser', state.allUsers[i])
                    break;
                }
            }
            if (!state.loggedIn) {
                commit('setLoginErr', true)
            }
            // commit('setCurrentUser', state.allUsers[0])
            // commit('setSelectedUser', state.allUsers[0])
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
            user.follows = []
            user.followedBy = []
            if (uniqueUser) {
                commit('setCurrentUser', user)
                commit('setSelectedUser', user)
                commit('setLoggedIn', true)
                commit('setWhichPage', 'Feed')
                commit('setLoginErr', false)
            }
        },
        unfollow: ({commit, state}) => {
            for (let i = 0; i < state.currentUser.follows.length; i++) {
                if (state.currentUser.follows[i].username === state.selectedUser.username) {
                    state.currentUser.follows.splice(i, 1)
                    for (let j = 0; j < state.selectedUser.followedBy.length; j++) {
                        if (state.selectedUser.followedBy[j].username === state.currentUser.username) {
                            state.selectedUser.followedBy.splice(j, 1)
                        }
                    }
                }
            }
        },
        follow: ({commit, state}, obj) => {
            state.currentUser.follows.push(state.selectedUser)
            state.selectedUser.followedBy.push(state.currentUser)
        },
        addStatus: ({commit, state}, obj) => {
            state.allStatuses.push(obj)
        },
        deleteStatus: ({commit, state}, obj) => {
            for (let i = 0; i < state.allStatuses.length; i++) {
                if (obj.id === state.allStatuses[i].id) {
                    state.allStatuses.splice(i, 1)
                }
            }
        }
    }
});