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
        feedPaginate: 0,
        storyPaginate: 0,
        hashPaginate: 0,
        loggingIn: false,
        followerPaginate: 0,
        followingPaginate: 0,
        feedEnd: false,
        followingEnd: false,
        followersEnd: false,
        storyEnd: false,
        hashtagEnd: false,
        hashtagList: [],
        storyList: [],
        feedList: [],
        switching: false
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
            if (!arr) {
                state.followedBy = []
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    state.followedBy.push(arr[i])
                }
            }
        },
        setFollowing: (state, arr) => {
            if (!arr) {
                state.follows = []
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    state.follows.push(arr[i])
                }
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
        setHasRelationship: (state, bool) =>  {
            state.hasRelationship = bool
        },
        setFeedPaginate: (state, num) => {
            if (num === 0) {
                state.feedPaginate = 0
            }
            else {
                state.feedPaginate++
            }
        },
        setStoryPaginate: (state, num) => {
            if (num === 0) {
                state.storyPaginate = num
            }
            else {
                state.storyPaginate++
            }
        },
        setHashPaginate: (state, num) => {
            if (num === 0) {
                state.hashPaginate = num
            }
            else {
                state.hashPaginate++
            }
        },
        setLoggingIn: (state, bool) => {
            state.loggingIn = bool
        },
        setFollowingPaginate: (state, num) => {
            if (num === 0) {
                state.followingPaginate = num
            }
            else {
                state.followingPaginate++
            }
        },
        setFollowerPaginate: (state, num) => {
            if (num === 0) {
                state.followerPaginate = num
            }
            else {
                state.followerPaginate++
            }
        },
        setStoryList: (state, arr) => {
            if (!arr) {
                state.storyList = []
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    state.storyList.push(arr[i])
                }
            }
        },
        setFeedList: (state, arr) => {
            if (!arr) {
                state.feedList = []
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    state.feedList.push(arr[i])
                }
            }
        },
        setHashtagList: (state, arr) => {
            if (!arr) {
                state.hashtagList = []
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    state.hashtagList.push(arr[i])
                }
            }
        },
        setFeedEnd: (state, bool) => {
            state.feedEnd = bool
        },
        setFollowingEnd: (state, bool) => {
            state.followingEnd = bool
        },
        setFollowersEnd: (state, bool) => {
            state.followersEnd = bool
        },
        setStoryEnd: (state, bool) => {
            state.storyEnd = bool
        },
        setHashtagEnd: (state, bool) => {
            state.hashtagEnd = bool
        },
        setSwitching: (state, bool) => {
            state.switching = bool
        }
    },

    actions: {
        fetchLogin: async ({commit, dispatch, state}) => {
            commit('setLoggingIn', true)
            commit('setLoggedIn', true)
            dispatch('getUser', state.username)
            commit('setFeedPaginate', 0)
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
                    state.followedBy.splice(j, 1)
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
                    state.follows.push(state.selectedUser)
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
                    state.storyList.unshift(obj)
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
            let skip = false
            if (state.whichPage === "Feed" || state.switching) {
                skip = true
                commit('setSwitching', false)
            }
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
                    commit('setFollowing', false)
                    commit('setFollowingPaginate', 0)
                    commit('setFollowers', false)
                    commit('setFollowerPaginate', 0)
                    dispatch('getFollowersList', state.selectedUser.username)
                    dispatch('getFollowingList', state.selectedUser.username)
                    dispatch('followRelationship', true)
                    if (state.whichPage === "Story" && state.storyList.length < 1 && !skip) {
                        commit('setStoryList', false)
                        commit('setStoryPaginate', 0)
                        dispatch('getStory')
                    }
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
                pagenum: state.followerPaginate
            }
            let pathTemplate = '/follows/followers/{username}/{pagenum}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    commit('setFollowers', result.data.userList)
                    if (result.data.end) {
                        commit('setFollowersEnd', true)
                    }
                    else {
                        commit('setFollowersEnd', false)
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
                pagenum: state.followingPaginate
            }
            let pathTemplate = '/follows/following/{username}/{pagenum}'
            let method = 'GET'
            let additionalParams = ""
            let body = ''
            apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
                .then(function(result){
                    commit('setFollowing', result.data.userList)
                    if (result.data.end) {
                        commit('setFollowingEnd', true)
                    }
                    else {
                        commit('setFollowingEnd', false)
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
                    commit('setFeedList', result.data.statuses)
                    if (result.data.end) {
                        commit('setFeedEnd', true)
                    }
                    else {
                        commit('setFeedEnd', false)
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
                    commit('setStoryList', result.data.statuses)
                    if (result.data.end) {
                        commit('setStoryEnd', true)
                    }
                    else {
                        commit('setStoryEnd', false)
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
                    commit('setHashtagList', result.data.statuses)
                    if (result.data.end) {
                        commit('setHashtagEnd', true)
                    }
                    else {
                        commit('setHashtagEnd', false)
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