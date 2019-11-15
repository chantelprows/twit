<template>
    <section style="padding-top: 10%;">
        <v-container bg fill-height grid-list-md text-xs-center>
            <v-layout row wrap justify-center align-center>
                <v-flex>
                    <div style="text-align: center">
                        <v-text-field
                                label="Username"
                                single-line
                                outlined
                                style="width: 20%; display: inline-block;"
                                v-model="username"
                        ></v-text-field>
                        <br>
                        <v-text-field
                                label="Password"
                                single-line
                                outlined
                                style="width: 20%; display: inline-block;"
                                type="password"
                                v-model="password"
                                @keyup.enter="login()"
                        ></v-text-field>
                        <br>
                        <v-btn :disabled="!password || !username" color="blue" style="color: white;" @click="login()"> Login </v-btn>
                        <div v-if="loginErr" style="color: red"> Incorrect Username or Password </div>
                        <br><br><br>
                        Don't have an account?
                        <br>
                        <v-btn color="blue" style="color: white; margin-top: 2px;" @click="signUp()"> Sign Up </v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "login",
        data: function() {
            return {
                username: null,
                password: null
            }
        },
        computed: {
            loginErr() {
                return this.$store.state.loginErr
            }
        },
        methods: {
            login() {
                firebase.auth().signInWithEmailAndPassword(this.username + "@gmail.com", this.password).then((user) => {
                    this.$store.commit('setUsername', this.username)
                    this.$store.dispatch('fetchLogin')
                    this.username = ""
                    this.password = ""
                }).catch((err) => {
                    this.$store.commit('setLoginErr', true)
                })
            },
            setUsername() {
                this.$store.commit('setUsername', this.username)
            },
            signUp() {
                this.$store.commit('setWhichPage', 'Signup')
                this.$store.commit('setLoginErr', false)
            }
        }
    }
</script>

<style scoped>

</style>