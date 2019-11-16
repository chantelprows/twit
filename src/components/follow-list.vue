<template>
    <v-dialog
            :value="showFollow"
            persistent
            no-click-animation
            width="500"
    >
        <v-card>
            <v-card-title class="title">
                {{followType}}
            </v-card-title>
            <hr style="background-color: deepskyblue">
            <br>
            <div v-for="(user) in followList" class="personCard" @click="selectUser(user)">
                <div style="display: flex;">
                    <img :src="user.photo" style="width: 50px; height: auto; margin-left: 20px;">
                    <div style="padding-left: 20px;">
                        <div style="font-weight: bold;">{{user.name}} </div>
                        <div>@{{user.username}}</div>
                    </div>
                </div>
            </div>
            <br>
            <div v-if="!isEnd()">
                <v-btn color="#2196F3" style="color: white; margin-left: 100px;" @click="loadMore()"> Load More </v-btn>
            </div>
            <br>
            <v-btn color="#2196F3" style="color: white; margin-left: 20px; margin-bottom: 10px;" @click="close()"> Close </v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "follow-list",
        props: {
            config: {
                followList: [],
                followType: ""
            }
        },
        computed: {
            showFollow() {
                return this.$store.state.showFollow
            },
            followList() {
                return [ ...new Set(this.config.followList) ]
            },
            followType() {
                return this.config.followType
            },
            allUsers() {
                return this.$store.state.allUsers
            }
        },
        methods: {
            close() {
                this.$store.commit('setShowFollow', false)
                this.$store.commit('setFollowerPaginate', 0)
                this.$store.commit('setFollowingPaginate', 0)
            },
            selectUser(user) {
                this.$store.dispatch('getUser', user.username)
                this.close()
            },
            loadMore() {
                if (this.followType === 'Following') {
                    this.$store.commit('setFollowingPaginate')
                    this.$store.dispatch('getFollowingList', this.$store.state.selectedUser.username)
                }
                else {
                    this.$store.commit('setFollowerPaginate')
                    this.$store.dispatch('getFollowersList', this.$store.state.selectedUser.username)
                }
            },
            isEnd() {
                if (this.followType === 'Following') {
                    return this.$store.state.followingEnd
                }
                else {
                    return this.$store.state.followersEnd
                }
            }
        }
    }
</script>

<style scoped>

    .personCard {
        cursor: pointer;
        height: 60px;
        padding-top: 6px;
    }

    .personCard:hover {
        background-color: lightblue;
    }

</style>