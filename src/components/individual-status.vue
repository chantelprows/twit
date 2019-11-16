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
                <div style="padding-left: 20px;" v-html="formatHtml(status.status)" ref="indStat"></div>
                <br>
                <img v-if="status.attachment" :src="status.attachment" style="width: 200px; height: auto; margin-left: 20px;">
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
                // for (let i = 0; i < this.allUsers.length; i++) {
                //     if (username === this.allUsers[i].username) {
                //         this.$store.commit('setSelectedUser', this.allUsers[i])
                //     }
                // }
                this.$store.dispatch('getUser', username)
                this.$store.commit('setStoryPaginate', 0)
                this.$store.commit('setFollowingPaginate', 0)
                this.$store.commit('setFollowerPaginate', 0)
                this.$store.commit('setWhichPage', "Story")
                this.$store.commit('setShowStatus', false)
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
                        innerHTML += "<a href='' style='text-decoration: none;'>" + mention + "</a>"
                        innerHTML += ' '
                    }
                    else if (status.charAt(i) === '#') {
                        let hashtag = ' '
                        while (status.charAt(i) !== ' ' && i < status.length) {
                            hashtag += status.charAt(i)
                            i++;
                        }

                        innerHTML += "<a href='' style='text-decoration: none;'>" + hashtag + "</a>"
                        innerHTML += ' '
                    }
                    else {
                        innerHTML += status.charAt(i)
                    }
                }
                innerHTML += "</div>"
                return innerHTML
            },
            goToHashtag(hashtag) {
                let cut = hashtag.substr(2)
                this.$store.commit('setHashtagList', false)
                this.$store.commit('setHashPaginate', 0)
                this.$store.dispatch('getHashtags', cut)
                this.$store.commit('setShowStatus', false)
                this.$store.commit('setWhichPage', 'Explore')
            },
            goToStory(mention) {
                let cut = mention.substr(2)
                this.$store.dispatch('getUser', cut)
                this.$store.commit('setStoryList', false)
                this.$store.commit('setFollowers', false)
                this.$store.commit('setFollowing', false)
                this.$store.commit('setStoryPaginate', 0)
                this.$store.commit('setFollowingPaginate', 0)
                this.$store.commit('setFollowerPaginate', 0)
                this.$store.commit('setWhichPage', "Story")
            }
        },
        mounted() {
            console.log(this.$refs['indStat'])
            let self = this
            let div = this.$refs['indStat']
            if (div.childNodes && div.childNodes[0] && div.childNodes[0].childNodes[1]) {
                let ogList = div.childNodes[0].childNodes

                for (let j = 0; j < ogList.length; j++) {
                    if (ogList[j].localName === "a") {
                        ogList[j].addEventListener('click', function (event) {
                            event.preventDefault()
                            let item =  event.target.childNodes[0].data
                            if (item.toString().charAt(1) === '#') {
                                self.goToHashtag(item)
                            }
                            else {
                                self.goToStory(item)
                            }
                        })
                    }
                }
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