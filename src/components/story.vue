<template>
    <section style="padding-left: 20px; padding-top: 20px;">
        <div style="display: inline-flex;">
            <div style="display: block">
                <v-img :key="pkey" :src="selectedUser.photo" height="120" width="120" style="margin-top: 20px;"></v-img>
                <div v-if="currentUser.username === selectedUser.username" style="font-style: italic;" class="cp" @click="addNew = true"> Change Picture </div>
                <v-file-input
                        label="Profile Photo"
                        prepend-icon="mdi-camera"
                        accept="image/jpeg"
                        :rules="rules"
                        v-model="picture"
                        v-show="addNew && isSelf"
                ></v-file-input>
                <v-btn :disabled="!picture" v-show="addNew && isSelf" style="color: white;" color="#2196F3" @click="uploadPicture()"> Change </v-btn>
            </div>
            <div style="padding-left: 20px;">
                <h1 style="font-size: 60px;"> {{selectedUser.name}}</h1>
                <div style="font-size: 20px; padding-left: 15px;"> @{{selectedUser.username}}</div>
                <div style="display: flex;">
                    <div style="padding-left: 15px; padding-top: 3px; font-style: italic" class="cp" @click="viewFollowing()"> following </div>
                    <div style="padding-left: 15px; padding-top: 3px; font-style: italic" class="cp" @click="viewFollowers()"> followers </div>
                    <v-btn v-if="!isSelf() && loggedIn" style="margin-left: 15px; color: white;" color="#2196F3" rounded @click="follow()"> {{followText()}} </v-btn>
                </div>
            </div>
        </div>
        <br><br><br>
        <add-status style="padding-left: 25%; padding-right: 25%;" v-if="currentUser.username === selectedUser.username"></add-status>
        <br><br><br>
        <status-list :key="loadKey" v-if="statuses.length > 0" :config="statuses" style="padding-left: 25%; padding-right: 25%;"></status-list>
        <follow-list :key="lkey" v-if="showFollow" :config="followObj"></follow-list>
    </section>
</template>

<script>
    import AddStatus from "./add-status"
    import FollowList from "./follow-list"
    import StatusList from "./status-list"

    export default {
        name: "story",
        components: {FollowList, AddStatus, StatusList},
        data: function() {
            return {
                picture: null,
                rules: [
                    //     value => !value || value.size < 2000000 || 'Photo size should be less than 2 MB!',
                ],
                addNew: false,
                followObj: {},
                loadKey: 0,
                lkey: 100,
                pkey: 200
            }
        },
        watch: {
            statuses() {
                this.loadKey++
            },
            followedBy() {
                this.followObj.followList = this.$store.state.followedBy
                this.lkey++
            },
            follows() {
                this.followObj.followList = this.$store.state.follows
                this.lkey++
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.currentUser
            },
            selectedUser() {
                return this.$store.state.selectedUser
            },
            showFollow() {
                return this.$store.state.showFollow
            },
            statuses() {
                return this.$store.state.storyList
            },
            loggedIn() {
                return this.$store.state.loggedIn
            },
            follows() {
                return this.$store.state.follows
            },
            followedBy() {
                return this.$store.state.followedBy
            },
            followRelationship() {
                return this.$store.state.hasRelationship
            }
        },
        methods: {
            followText() {
                if (this.followRelationship) {  //uncomment when databse is updated
                    return "Unfollow"
                }
                return "Follow"
            },
            isSelf() {
                return this.selectedUser.username === this.currentUser.username
            },
            follow() {
                if (this.followText() === "Unfollow") {
                    this.$store.dispatch('unfollow')
                }
                else {
                    this.$store.dispatch('follow')
                }
            },
            uploadPicture() {
                this.addNew = false

                let AWS = require('aws-sdk')

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
                    let objKey = 'photo/' + this.currentUser.username
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
                            this.pkey++
                        }
                    })
                }
                // this.$store.dispatch('changePhoto', URL.toDataURL(this.picture))
                this.picture = null
            },
            // urlGet() {
            //     if (this.selectedUser.photo) {
            //         return this.selectedUser.photo
            //     }
            //     return 'https://picsum.photos/510/300?random'
            // },
            viewFollowers() {
                this.followObj.followList = this.$store.state.followedBy
                this.followObj.followType = 'Followers'
                this.$store.commit('setShowFollow', true)
            },
            viewFollowing() {
                this.followObj.followList = this.$store.state.follows
                this.followObj.followType = 'Following'
                this.$store.commit('setShowFollow', true)
            }
        },
        mounted() {
            this.$store.commit('setStoryPaginate', 0)
            this.$store.dispatch('getStory')
        }
    }
</script>

<style scoped>

    .cp {
        cursor: pointer;
        padding-left: 5px;
    }

    .cp:hover {
        color: blue;
    }

</style>