<template>
    <v-dialog
            :value="showFollow"
            persistent
            no-click-animation
            width="500"
    >
        <v-card>
            <v-card-title class="title">
                List
            </v-card-title>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "follow-list",
        props: {
            config: {
                followList: []
            }
        },
        computed: {
            showFollow() {
                return this.$store.state.showFollow
            }
        }
    }
</script>

<style scoped>

</style>