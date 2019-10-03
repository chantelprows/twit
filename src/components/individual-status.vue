<template>
    <section>
        <v-dialog
                :value="showStatus"
                persistent
                no-click-animation
                width="500"
        >
            <v-card style="padding-top: 20px;">
                <div style="display: flex;">
                    <img :src="status.image" style="width: 50px; height: auto; margin-left: 20px;">
                    <div style="padding-left: 20px;">
                        <div style="font-weight: bold;">{{status.name}} </div>
                        <div class="username" @click="changeUser(status.username)">@{{status.username}}</div>
                    </div>
                </div>
                <br>
                <div style="padding-left: 20px;" v-html="status.status"></div>
                <br>
                <img v-if="status.attachment" :src="status.attachment" style="width: 50px; height: auto; margin-left: 20px;">
                <br><br v-if="status.attachment">
                <v-btn color="#2196F3" style="color: white; margin-left: 20px; margin-bottom: 10px;" @click="close()"> Close </v-btn>
            </v-card>
        </v-dialog>
    </section>
</template>

<script>
    export default {
        name: "individual-status",
        props: {
            config: {
                status: {}
            }
        },
        computed: {
            status() {
                return this.config
            },
            showStatus() {
                return this.$store.state.showStatus
            },
            allUsers() {
                return this.$store.state.allUsers
            }
        },
        methods: {
            close() {
                this.$store.commit('setShowStatus', false)
            },
            changeUser(username) {
                for (let i = 0; i < this.allUsers.length; i++) {
                    if (username === this.allUsers[i].username) {
                        this.$store.commit('setSelectedUser', this.allUsers[i])
                    }
                }
                this.$store.commit('setWhichPage', "Story")
                this.$store.commit('setShowStatus', false)
            }
        }
    }
</script>

<style scoped>

    .username {
        color: dodgerblue;
        cursor: pointer;
    }

    .username:hover {
        color: blue;
    }

</style>