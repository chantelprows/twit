<template>
  <section>
    <router-view/>
    <v-toolbar style="background-color: #2196F3" dark>
      <v-toolbar-title> Chirper <v-icon> fas fa-kiwi-bird</v-icon> </v-toolbar-title>


      <v-toolbar-items style="margin-left: 20px;">
        <v-btn text v-show="loggedIn">Feed</v-btn>
        <v-btn text v-show="loggedIn">Story</v-btn>
        <v-btn text>Explore</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <template>
        <v-btn v-if="!loggedIn" text>
          Sign in
        </v-btn>
        <div v-else>
          Logged In
        </div>
      </template>
    </v-toolbar>

    <div v-if="!loggedIn">
      <login v-if="!showSignup"></login>
<!--      <signup v-else></signup>-->
    </div>
    <div v-else>
      Logged in
    </div>
  </section>
</template>

<script>
import Login from './components/login'
import Signup from './components/sign-up'

export default {
  name: 'App',
  components: {
    Login,
    Signup
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    },
    showSignup() {
      return this.$store.state.showSignup
    }
  },
  data: function() {
    return {

    }
  },
};
</script>
