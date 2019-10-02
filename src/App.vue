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
    </div>
    </section>
  </v-app>
</template>

<script>
import Login from './components/login'
import Signup from './components/sign-up'
import Feed from './components/feed'
import Story from './components/story'

export default {
    name: 'App',
    components: {
        Story,
        Feed,
        Login,
        Signup
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
            this.$store.commit('setWhichPage', str)
            if (str === 'Story') {
                this.$store.commit('setSelectedUser', this.$store.state.currentUser)
            }
        },
        logout() {
            this.setPage("Login")
            this.$store.commit('setCurrentUser', {})
            this.$store.commit('setLoggedIn', false)
        }
    }
};
</script>
