<template>
  <section>
    <div v-if="!loggedIn">
      <login v-if="!showSignup"></login>
      <signup v-else></signup>
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
