<template>
    <section style="text-align: center; padding-top: 5%;">
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
            <br><br>
            <div v-if="loginErr" style="color: red"> Username is already taken </div>
        </div>
    </section>
</template>

<script>
    import firebase from 'firebase'

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
            // singleFileToBase64(file) {
            //     let reader = new FileReader();
            //     // read the file into a base64 format
            //     reader.readAsDataURL(file);
            //
            //     return new Promise((resolve, reject) => {
            //         reader.onerror = () => {
            //             reader.abort();
            //             reject("Insert error message here")
            //         };
            //
            //         // return the base 64 string
            //         reader.onload = function () {
            //             resolve(reader.result);
            //         };
            //     })
            // },
            async signUp() {
                let AWS = require('aws-sdk')

                // let attach = await this.singleFileToBase64(this.picture)
                let user1 = {
                    name: this.name,
                    username: this.username,
                    photo: "https://photos-cs340.s3-us-west-2.amazonaws.com/photo/" + this.username
                }
                firebase.auth().createUserWithEmailAndPassword(this.username + "@gmail.com", this.password).then((user) => {
                    this.$store.dispatch('createUser', user1)


                    AWS.config.region = 'us-west-2'
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'us-west-2:c82ad060-6671-4686-9f9a-2cfec06297dc',
                    })
                    AWS.config.credentials.get(function(err) {
                        if (err) alert(err)
                        // console.log(AWS.config.credentials)
                    })

                    let bucketName = 'photos-cs340'
                    let bucket = new AWS.S3({
                        params: {
                            Bucket: bucketName
                        }
                    })

                    let file = this.picture
                    if (file) {
                        let objKey = 'photo/' + this.username
                        let params = {
                            Key: objKey,
                            ContentType: file.type,
                            Body: file,
                            ACL: 'public-read'
                        }

                        bucket.putObject(params, function(err, data) {
                            if (err) {
                                alert(err)
                            } else {
                                console.log("WORKED")
                            }
                        })
                    }
                }).catch((err) => {
                    this.$store.commit('setLoginErr', true)
                })
            }
        }
    }
</script>

<style scoped>

</style>