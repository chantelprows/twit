<template>
    <section style="padding-left: 20px; padding-top: 20px;">
        <div style="display: inline-flex;">
            <v-img src="https://picsum.photos/510/300?random" height="120" width="120" style="margin-top: 20px;"></v-img>
            <div style="padding-left: 20px;">
                <h1 style="font-size: 60px;"> {{selectedUser.name}}</h1>
                <div style="font-size: 20px; padding-left: 15px;"> @{{selectedUser.username}}</div>
                <div style="display: flex;">
                    <div style="padding-left: 15px; padding-top: 3px; font-style: italic"> {{selectedUser.follows.length}} following </div>
                    <div style="padding-left: 15px; padding-top: 3px; font-style: italic"> {{selectedUser.followedBy.length}} followers </div>
                    <v-btn v-if="!isSelf()" style="margin-left: 15px; color: white;" color="#2196F3" rounded @click="follow()"> {{followText()}} </v-btn>
                </div>
            </div>
        </div>
        <br><br><br>
        <add-status style="padding-left: 25%; padding-right: 25%;"></add-status>
    </section>
</template>

<script>
    import AddStatus from "./addStatus"

    export default {
        name: "story",
        components: {AddStatus},
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
                    if (this.currentUser.follows[i].username === this.selectedUser.username) {
                        return "Unfollow"
                    }
                }
                return "Follow"
            },
            isSelf() {
                // return this.selectedUser.username === this.currentUser.username
                return false
            },
            follow() {
                if (this.followText === "Unfollow") {
                    this.$store.dispatch('unfollow')
                }
                else {
                    this.$store.dispatch('follow')
                }
            }
        }
    }
</script>

<style scoped>

</style>