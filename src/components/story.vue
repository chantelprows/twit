<template>
    <section style="padding-left: 20px; padding-top: 20px;">
        <div style="display: inline-flex;">
            <div style="display: block">
                <v-img :src="urlGet()" height="120" width="120" style="margin-top: 20px;"></v-img>
                <div style="font-style: italic;" class="cp" @click="addNew = true"> Change Picture </div>
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
                    <div style="padding-left: 15px; padding-top: 3px; font-style: italic" class="cp" @click="viewFollowing()"> {{selectedUser.follows.length}} following </div>
                    <div style="padding-left: 15px; padding-top: 3px; font-style: italic" class="cp" @click="viewFollowers()"> {{selectedUser.followedBy.length}} followers </div>
                    <v-btn v-if="!isSelf()" style="margin-left: 15px; color: white;" color="#2196F3" rounded @click="follow()"> {{followText()}} </v-btn>
                </div>
            </div>
        </div>
        <br><br><br>
        <add-status style="padding-left: 25%; padding-right: 25%;"></add-status>
        <follow-list :config="followList"></follow-list>
    </section>
</template>

<script>
    import AddStatus from "./addStatus"
    import FollowList from "./follow-list"

    export default {
        name: "story",
        components: {FollowList, AddStatus},
        data: function() {
            return {
                picture: null,
                rules: [
                    //     value => !value || value.size < 2000000 || 'Photo size should be less than 2 MB!',
                ],
                addNew: false,
                followList: []
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.currentUser
            },
            selectedUser() {
                return this.$store.state.selectedUser
            }
        },
        methods: {
            followText() {
                for (let i = 0; i < this.currentUser.follows.length; i++) {
                    console.log(this.currentUser.follow)
                    if (this.currentUser.follows[i].username === this.selectedUser.username) {
                        return "Unfollow"
                    }
                }
                return "Follow"
            },
            isSelf() {
                return this.selectedUser.username === this.currentUser.username
                //return false
            },
            follow() {
                if (this.followText === "Unfollow") {
                    this.$store.dispatch('unfollow')
                }
                else {
                    this.$store.dispatch('follow')
                }
            },
            uploadPicture() {
                this.addNew = false
                //call API here
                this.selectedUser.picture = URL.createObjectURL(this.picture)
                this.picture = null
            },
            urlGet() {
                if (this.selectedUser.picture) {
                    return this.selectedUser.picture
                }
                return 'https://picsum.photos/510/300?random'
            },
            viewFollowers() {
                this.followList = this.selectedUser.followedBy
                this.$store.commit('setShowFollow', true)
            },
            viewFollowing() {
                this.followList = this.selectedUser.follows
                this.$store.commit('setShowFollow', true)

            }
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