<template>
    <section style="text-align: center; padding-top: 200px;">
        <div style="text-align: center">
            <v-text-field
                    label="Name"
                    single-line
                    outlined
                    style="width: 20%; display: inline-block;"
                    v-model="name"
            ></v-text-field>
            <br>
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
            ></v-text-field>
            <br>
            <v-file-input
                label="Profile Photo"
                prepend-icon="mdi-camera"
                accept="image/jpeg"
                :rules="rules"
                style="padding-left: 40%; padding-right: 40%;"
                v-model="picture"
            ></v-file-input>
            <br>
            <v-btn color="blue" style="color: white; margin-top: 2px;" :disabled="disabled()" @click="signUp()"> Sign Up </v-btn>
            <br>
            <div v-if="loginErr" style="color: red"> Username is already taken </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "signup",
        computed: {
            loginErr() {
                return this.$store.state.loginErr
            }
        },
        data: function () {
            return {
                name: null,
                username: null,
                password: null,
                picture: null,
                rules: [
                //     value => !value || value.size < 2000000 || 'Photo size should be less than 2 MB!',
                ]
            }
        },
        methods: {
            disabled() {
                return !(this.name && this.username && this.password && this.picture)
            },
            signUp() {
                let user = {
                    name: this.name,
                    username: this.username,
                    password: this.password,
                    picture: URL.createObjectURL(this.picture)
                }
                this.$store.dispatch('createUser', user)
            }
        }
    }
</script>

<style scoped>

</style>