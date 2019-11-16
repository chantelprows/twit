<template>
    <section>
        <br>
        <div style="display: flex; padding-left: 20px;">
            <h1 style="font-size: 50px; padding-right: 50px;"> Explore</h1>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    clear-icon="mdi-close"
                    clearable
                    label="Search"
                    type="text"
                    outlined
                    @click:append="searcher()"
                    @keyup.enter="searcher()"
                    style="padding-right: 75%; padding-top: 10px;"
            ></v-text-field>
        </div>
        <div style="display: flex;">
            <div style="padding-left: 20px;">
<!--                <h1> Users: </h1>-->
                <div v-for="user in allUsers">
                    <br>
                    <div style="font-weight: bold">{{user.name}}</div>
                    <div class="username" @click="changeUser(user)">@{{user.username}}</div>
                </div>
            </div>
            <div style="padding-left: 25%; width: 70%">
                <h2> {{hashtag}} </h2>
                <br>
                <status-list :key="loadKey" v-if="allStatuses.length > 0" :config="allStatuses"></status-list>
            </div>
        </div>
    </section>
</template>

<script>
    import StatusList from "./status-list"

    export default {
        name: "explore",
        components: {StatusList},
        data: function() {
            return {
                search: '',
                hashtag: '',
                loadKey: 0
            }
        },
        watch: {
            allStatuses() {
                this.loadKey++
            }
        },
        computed: {
            allUsers() {
                return this.$store.state.allUsers
            },
            selectedHashtag() {
                return this.$store.state.selectedHashtag
            },
            allStatuses() {
                return this.$store.state.hashtagList
            }
        },
        methods: {
            searcher() {
                console.log("search: ", this.search)
            },
            changeUser(user) {
                this.$store.dispatch('getUser', user.username)
                this.$store.commit('setStoryPaginate', 0)
                this.$store.commit('setFollowingPaginate', 0)
                this.$store.commit('setFollowerPaginate', 0)
                this.$store.commit('setWhichPage', "Story")
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