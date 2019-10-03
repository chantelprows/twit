<template>
    <section>
        <div v-for="status in statusList" class="status">
            <div style="display: flex;">
                <img :src="status.image" style="width: 50px; height: 50px; margin-right: 10px;">
                <div>
                    <div style="display: flex;">
                        <div style="font-weight: bold; padding-right: 10px;">{{status.name}} </div>
                        <div class="username" @click="changeUser(status.username)">@{{status.username}}</div>
                        <v-icon v-if="showDelete(status)" style="padding-left: 10px;" title="Delete Status" @click="deleteStatus(status)">
                            mdi-delete
                        </v-icon>
                    </div>
                    <div>
                        <div v-html="formatHtml(status.status)"> </div>
                        <div v-if="status.attachment">
                            <br>
                            <img :src="status.attachment" style="width: 50px; height: auto; margin-right: 10px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div v-if="moreToShow()">
            <v-btn color="#2196F3" style="color: white;" @click="pageNum = pageNum + 5"> Load More </v-btn>
        </div>
        <individual-status :config="curStatus"></individual-status>
    </section>
</template>

<script>
    import IndividualStatus from './individual-status'

    export default {
        name: "status-list",
        components: {IndividualStatus},
        data: function() {
            return {
                pageNum: 5,
                curStatus: {}
            }
        },
        props: {
            config: {
                list: []
            }
        },
        computed: {
            statusList() {
                if (this.config.length > this.pageNum) {
                    return this.config.slice(0, this.pageNum)
                }
                return this.config
            },
            allUsers() {
                return this.$store.state.allUsers
            }
        },
        methods: {
            viewStatus(status) {
                this.curStatus = status
                this.$store.commit('setShowStatus', true)
            },
            showDelete(status) {
                return status.username === this.$store.state.currentUser.username
            },
            deleteStatus(status) {
                this.$store.dispatch('deleteStatus', status)
            },
            moreToShow() {
                return this.config.length > this.pageNum
            },
            changeUser(username) {
                for (let i = 0; i < this.allUsers.length; i++) {
                    if (username === this.allUsers[i].username) {
                        this.$store.commit('setSelectedUser', this.allUsers[i])
                    }
                }
                this.$store.commit('setWhichPage', "Story")
                this.$store.commit('setShowStatus', false)
            },
            goToHashtag(hashtag) {
                console.log("REACHED ", hashtag)
            },
            goToStory(mention) {
                console.log("REACHED ", mention)
            },
            formatHtml(status) {
                let innerHTML = '<div>'
                for (let i = 0; i < status.length; i++) {
                    if (status.charAt(i) === '@') {
                        let mention = ' '
                        while (status.charAt(i) !== ' ' && i < status.length) {
                            mention += status.charAt(i)
                            i++;
                        }
                        innerHTML += "<a @click='goToStory(mention)'>" + mention + "</a>"
                        innerHTML += ' '
                    }
                    else if (status.charAt(i) === '#') {
                        let hashtag = ' '
                        while (status.charAt(i) !== ' ' && i < status.length) {
                            hashtag += status.charAt(i)
                            i++;
                        }

                        innerHTML += "<a @click='goToHashtag(hashtag)'>" + hashtag + "</a>"
                        innerHTML += ' '
                    }
                    else {
                        innerHTML += status.charAt(i)
                    }
                }
                innerHTML += "</div>"
                return innerHTML
            }
        }
    }
</script>

<style scoped>

    .status {
        padding-top: 20px;
        padding-bottom: 20px;
        cursor: pointer;
        padding-left: 10px;
        padding-right: 10px;
        border: 1px solid aliceblue;
        margin-bottom: 10px;
    }

    .status:hover {
        background-color: aliceblue;
    }

    .username {
        color: dodgerblue;
        cursor: pointer;
    }

    .username:hover {
        color: blue;
    }

</style>