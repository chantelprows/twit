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
                    <img :src="user.picture" style="width: 50px; height: auto; margin-left: 20px;">
                    <div style="padding-left: 20px;">
                        <div style="font-weight: bold;">{{user.name}} </div>
                        <div>@{{user.username}}</div>
                    </div>
                </div>
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
                return this.config.followList
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
            },
            selectUser(user) {
                this.$store.dispatch('getUser', user.username)
                this.close()
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