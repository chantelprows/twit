<template>
    <v-app>
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
                        <v-btn color="blue" style="color: white;" @click="login()"> Login </v-btn>
                        <br><br><br>
                        Don't have an account?
                        <br>
                        <v-btn color="blue" style="color: white; margin-top: 2px;" @click="signUp()"> Sign Up </v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "login",
        data: function() {
            return {
                username: "",
                password: ""
            }
        },
        computed: {
            userName() {
                return this.$store.state.username
            }
        },
        methods: {
            login() {
                this.setUsername()
                this.setPassword()
                this.$store.dispatch('fetchLogin')
                this.username = ""
                this.password = ""
            },
            setUsername() {
                this.$store.commit('setUsername', this.username)
            },
            setPassword() {
                this.$store.commit('setPassword', this.password)
            },
            signUp() {
                this.$router.push({ path: '/sign-up' })
            }
        }
    }
</script>

<style scoped>

    .center {
        margin: auto;
        width: 50%;
    }

</style>