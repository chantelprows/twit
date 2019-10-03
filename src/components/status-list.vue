<template>
    <section>
        <div v-for="(status, i) in statusList" class="status" v-show="pageNum > i">
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
                        <div v-html="formatHtml(status.status)" ref="mydiv"> </div>
                        <div @click="viewStatus(status)" style="height: 10px; cursor: pointer;"></div>
                        <div v-if="status.attachment" @click="viewStatus(status)" style="cursor: pointer;">
                            <br>
                            <img :src="status.attachment" style="width: 100px; height: auto; margin-right: 10px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div v-if="moreToShow()">
            <v-btn color="#2196F3" style="color: white;" @click="loadMore()"> Load More </v-btn>
        </div>
        <individual-status v-if="showStatus" :config="curStatus"></individual-status>
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
                // if (this.config.length > this.pageNum) {
                //     return this.config.slice(0, this.pageNum)
                // }
                // else {
                //     this.pageNum = this.config.length
                //     return this.config
                // }
                return this.config

            },
            allUsers() {
                return this.$store.state.allUsers
            },
            showStatus() {
                return this.$store.state.showStatus
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
            loadMore() {
                if (this.pageNum + 5 > this.config.length) {
                    this.pageNum = this.config.length
                }
                else {
                    this.pageNum = this.pageNum + 5
                }
            },
            goToHashtag(hashtag) {
                let cut = hashtag.substr(1)
                this.$store.commit('setSelectedHashtag', cut)
                this.$store.commit('setWhichPage', 'Explore')
            },
            goToStory(mention) {
                let cut = mention.substr(2)
                for (let i = 0; i < this.allUsers.length; i++) {
                    if (cut === this.allUsers[i].username) {
                        this.$store.commit("setSelectedUser", this.allUsers[i])
                    }
                }
                this.$store.commit('setWhichPage', "Story")
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
            }
        },
        mounted() {
            console.log(this.$refs['mydiv'])
            let self = this
            let divList = this.$refs['mydiv']
            if (divList) {
                for (let i = 0; i < divList.length; i++) {
                    if (divList[i].childNodes && divList[i].childNodes[0] && divList[i].childNodes[0].childNodes[1]) {
                        let ogList = this.$refs['mydiv'][i].childNodes[0].childNodes

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
        }
    }
</script>

<style scoped>

    .status {
        padding-top: 20px;
        padding-bottom: 20px;
        /*cursor: pointer;*/
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