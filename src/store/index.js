import Vuex from 'vuex'
import Vue from 'vue'

var apigClientFactory = require('aws-api-gateway-client').default;

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        username: "",
        loggedIn: false,
        whichPage: "Login",
        currentUser: {},
        loginErr: false,
        selectedUser: {},
        showFollow: false,
        showStatus: false,
        selectedHashtag: '',
        follows: [],
        followedBy: [],
        hasRelationship: false,
        feedPaginate: 1,
        storyPaginate: 1,
        hashPaginate: 1,
        loggingIn: false,
        allStatuses: [],
        followPaginate: 1,
        isEnd: false
    },

    getters: {

    },

    mutations: {
        setUsername: (state, str) => {
            state.username = str
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
        setFollowers: (state, arr) => {
            for (let i = 0; i < arr.length; i++) {
                // if (state.selectedUser) {
                //     state.selectedUser.followedBy.push(arr[i])
                // }
                state.followedBy.push(arr[i])
            }
        },
        setFollowing: (state, arr) => {

            for (let i = 0; i < arr.length; i++) {
                // if (state.selectedUser) {
                //     state.selectedUser.follows.push(arr[i])
                // }
                state.follows.push(arr[i])
            }
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
            for (let i = 0; i < arr.length; i++) {
                state.allStatuses.push(arr[i])
            }
            // state.allStatuses = arr
        },
        setHasRelationship: (state, bool) =>  {
            state.hasRelationship = bool
        },
        setFeedPaginate: (state) => {
            state.feedPaginate++
        },
        setStoryPaginate: (state) => {
            state.storyPaginate++
        },
        setHashPaginate: (state) => {
            state.hashPaginate++
        },
        setLoggingIn: (state, bool) => {
            state.loggingIn = bool
        },
        setFollowPaginate: (state, num) => {
            if (num) {
                state.followPaginate = num
            }
            else {
                state.followPaginate++
            }
        }
    },

    actions: {
        fetchLogin: async ({commit, dispatch, state}) => {
            commit('setLoggingIn', true)
            commit('setLoggedIn', true)
            dispatch('getUser', state.username)
            commit('setWhichPage', 'Feed')
            commit('setLoginErr', false)
            commit('setCurrentUser', state.selectedUser)
        },
        createUser: ({commit, state}, user) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {}
            let pathTemplate = '/user/add'
            let method = 'POST'
            let additionalParams = ""
            let body = user

            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    console.log(result)
                    //CHECK IF VALID SIGN IN
                    commit("setCurrentUser", user)
                    commit("setSelectedUser", user)
                    commit('setLoggedIn', true)
                    commit('setWhichPage', 'Feed')
                }).catch( function(result){
                    console.log(result)
            })
        },
        unfollow: ({commit, dispatch, state}) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                follower: state.currentUser.username,
                followee: state.selectedUser.username
            }
            let pathTemplate = '/follows/{follower}/{followee}'
            let method = 'DELETE'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    for (let j = 0; j < state.selectedUser.followedBy.length; j++) {
                        if (state.selectedUser.followedBy[j].username === state.currentUser.username) {
                            state.selectedUser.followedBy.splice(j, 1)
                        }
                    }

                    dispatch('followRelationship', false)
                }).catch( function(result){
                console.log(result)
            })
        },
        follow: ({commit, dispatch, state}) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                follower: state.currentUser.username,
                followee: state.selectedUser.username
            }
            let pathTemplate = '/follows/{follower}/{followee}'
            let method = 'POST'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    state.currentUser.follows.push(state.selectedUser)
                    state.selectedUser.followedBy.push(state.currentUser)
                    dispatch('followRelationship', true)

                }).catch( function(result){
                console.log(result)
            })
        },
        followRelationship: ({commit, state}, bool) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                follower: state.currentUser.username,
                followee: state.selectedUser.username
            }
            let pathTemplate = '/follows/{follower}/{followee}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    commit('setHasRelationship', bool)
                }).catch( function(result){
                console.log(result)
            })
        },
        addStatus: ({commit, state}, obj) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })

            let pathParams = {}
            let pathTemplate = '/status'
            let method = 'POST'
            let additionalParams = ""

            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, obj)
                .then(function(result){
                    state.allStatuses.unshift(obj)
                }).catch( function(result){
                console.log(result)
            })
        },
        // deleteStatus: ({commit, state}, obj) => {
        //     let apigClient = apigClientFactory.newClient({
        //         invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
        //         apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
        //         region: 'us-west-2'
        //     })
        //     let pathParams = {
        //         id: obj.id,
        //     }
        //     let pathTemplate = '/status/{id}'
        //     let method = 'DELETE'
        //     let additionalParams = ""
        //     let body = obj
        //     apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
        //         .then(function(result){
        //             for (let i = 0; i < state.allStatuses.length; i++) {
        //                 if (obj.id === state.allStatuses[i].id) {
        //                     state.allStatuses.splice(i, 1)
        //                 }
        //             }
        //         }).catch( function(result){
        //         console.log(result)
        //     })
        // },
        getUser: ({commit, dispatch, state}, username) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                username: username,
            }
            let pathTemplate = '/user/{username}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(async function(result){
                    commit('setSelectedUser', result.data.output)
                    if (state.loggingIn) {
                        commit('setCurrentUser', result.data.output)
                        commit('setLoggingIn', false)
                    }
                    dispatch('getFollowersList', state.selectedUser.username)
                    dispatch('getFollowingList', state.selectedUser.username)
                    dispatch('followRelationship', true)
                    // if (state.whichPage === "Story") {
                    //     dispatch('getStory')
                    // }
                }).catch( function(result){
                    console.log(result)

            })
        },
        getFollowersList: ({commit, state}, username) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                username: username,
                pagenum: state.followPaginate
            }
            let pathTemplate = '/follows/followers/{username}/{pagenum}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    commit('setFollowers', result.data.userList)
                    if (result.data.end) {
                        state.isEnd = true
                    }
                    else {
                        state.isEnd = false
                    }
                }).catch( function(result){
                console.log(result)
            })
        },
        getFollowingList: ({commit, state}, username) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                username: username,
                pagenum: state.followPaginate
            }
            let pathTemplate = '/follows/following/{username}/{pagenum}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    commit('setFollowing', result.data.userList)
                    if (result.data.end) {
                        state.isEnd = true
                    }
                    else {
                        state.isEnd = false
                    }
                }).catch( function(result){
                console.log(result)
            })
        },
        getFeed: ({commit, state}) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                username: state.username,
                pagenum: state.feedPaginate
            }
            let pathTemplate = '/status/feed/{username}/{pagenum}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    commit('setAllStatuses', result.data.statuses)
                    if (result.data.end) {
                        state.isEnd = true
                    }
                    else {
                        state.isEnd = false
                    }
                }).catch( function(result){
                console.log(result)
            })
        },
        getStory: ({commit, state}) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                username: state.selectedUser.username,
                pagenum: state.storyPaginate
            }
            let pathTemplate = '/status/user/{username}/{pagenum}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    commit('setAllStatuses', result.data.statuses)
                    if (result.data.end) {
                        state.isEnd = true
                    }
                    else {
                        state.isEnd = false
                    }
                }).catch( function(result){
                console.log(result)
            })
        },
        getHashtags: ({commit, state}, hashtag) => {
            let apigClient = apigClientFactory.newClient({
                invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
                apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
                region: 'us-west-2'
            })
            let pathParams = {
                hashtag: hashtag,
                pagenum: state.hashPaginate
            }
            let pathTemplate = '/status/hashtag/{hashtag}/{pagenum}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    commit('setAllStatuses', result.data.statuses)
                    if (result.data.end) {
                        state.isEnd = true
                    }
                    else {
                        state.isEnd = false
                    }
                }).catch( function(result){
                console.log(result)
            })
        },
        // changePhoto: ({commit, state}, photo) => {
        //     let apigClient = apigClientFactory.newClient({
        //         invokeUrl: 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev',
        //         apiKey: 'zNOgJkbJNb5sQFQzwJD077yjx2LxnEk25g7Z2Hd7',
        //         region: 'us-west-2'
        //     })
        //     let pathParams = {
        //         username: state.currentUser.username,
        //         photo: photo
        //     }
        //     let pathTemplate = '/user/photo/{username}/{photo}'
        //     let method = 'PUT'
        //     let additionalParams = ""
        //     let body = ''
        //     apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
        //         .then(function(result){
        //             console.log(result)
        //             state.currentUser.photo = photo
        //         }).catch( function(result){
        //         console.log(result)
        //     })
        //
        // }
    }
});