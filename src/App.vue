<template>
  <v-app>
    <section>
      <v-toolbar style="background-color: #2196F3" dark>
        <v-toolbar-title> Chirper <v-icon> fas fa-kiwi-bird</v-icon> </v-toolbar-title>

        <v-toolbar-items style="margin-left: 20px;">
          <v-btn text @click="setPage('Feed')" v-show="loggedIn">Feed</v-btn>
          <v-btn text @click="setPage('Story')" v-show="loggedIn">Story</v-btn>
          <v-btn text @click="setPage('Explore')">Explore</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>
        <template>
          <v-btn v-if="!loggedIn && whichPage !== 'Login'" @click="setPage('Login')" text>
            Sign in
          </v-btn>
          <div v-else-if="whichPage !== 'Login'">
            {{currentUser.name}}
            <v-btn @click="logout()" text>
              Sign Out
            </v-btn>
          </div>
        </template>
      </v-toolbar>

      <div>
        <login v-if="whichPage === 'Login'"></login>
        <signup v-if="whichPage === 'Signup'"></signup>
        <feed v-if="whichPage === 'Feed'"></feed>
        <story v-if="whichPage === 'Story'"></story>
        <explore v-if="whichPage === 'Explore'"></explore>
      </div>
    </section>
  </v-app>
</template>

<script>

  import Login from './components/login'
  import Signup from './components/sign-up'
  import Feed from './components/feed'
  import Story from './components/story'
  import Explore from './components/explore'
  import firebase from 'firebase'

  export default {
    name: 'App',
    components: {
      Story,
      Feed,
      Login,
      Signup,
      Explore
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn
      },
      showSignup() {
        return this.$store.state.showSignup
      },
      whichPage() {
        return this.$store.state.whichPage
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    data: function() {
      return {

      }
    },
    methods: {
      setPage(str) {
        this.$store.commit('setLoginErr', false)
        this.$store.commit('setWhichPage', str)
        if (str === 'Story') {
          this.$store.commit('setSwitching', true)
          this.$store.commit('setStoryList', false)
          this.$store.commit('setFollowers', false)
          this.$store.commit('setFollowing', false)
          this.$store.commit('setStoryPaginate', 0)
          this.$store.commit('setFollowingPaginate', 0)
          this.$store.commit('setFollowerPaginate', 0)
          this.$store.dispatch('getUser', this.$store.state.currentUser.username)
        }
        if (str === 'Explore') {
          this.$store.commit('setHashPaginate', 0)
          this.$store.commit('setHashtagList', false)
        }
        if (str === 'Feed') {
          this.$store.commit('setFeedList', false)
          this.$store.commit('setFeedPaginate', 0)
        }
      },
      logout() {
        firebase.auth().signOut().then(() => {
          this.setPage("Login")
          this.$store.commit('setCurrentUser', {})
          this.$store.commit('setLoggedIn', false)
          this.$store.commit('setStoryPaginate', 0)
          this.$store.commit('setFeedPaginate', 0)
          this.$store.commit('setHashPaginate', 0)
          this.$store.commit('setFeedList', false)
          this.$store.commit('setHashtagList', false)
          this.$store.commit('setStoryList', false)
          this.$store.commit('setFollowingPaginate', 0)
          this.$store.commit('setFollowerPaginate', 0)
          this.$store.commit('setFollowers', false)
          this.$store.commit('setFollowing', false)
        })
      }
    },
    created() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('setUsername', user.email.replace('@gmail.com', ''))
          this.$store.dispatch('fetchLogin')
        }
      })
    }
  };

</script>
