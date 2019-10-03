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
        <div style="padding-left: 20px;">
            <h1> Users: </h1>
            <div v-for="user in allUsers">
                <br>
                <div style="font-weight: bold">{{user.name}}</div>
                <div class="username" @click="changeUser(user)">@{{user.username}}</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "explore",
        data: function() {
            return {
                search: ''
            }
        },
        computed: {
            allUsers() {
                return this.$store.state.allUsers
            }
        },
        methods: {
            searcher() {
                console.log("search: ", this.search)
            },
            changeUser(user) {
                this.$store.commit('setSelectedUser', user)
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