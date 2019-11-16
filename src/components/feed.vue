<template>
    <section>
        <br><br>
        <add-status style="padding-left: 25%; padding-right: 25%;"></add-status>
        <br><br>
        <status-list :key="loadKey" v-if="statusList.length > 0" :config="statusList" style="margin-left: 25%; margin-right: 25%;"></status-list>
    </section>
</template>

<script>
    import StatusList from './status-list'
    import AddStatus from './add-status'

    export default {
        name: "feed",
        components: {StatusList, AddStatus},
        data: function() {
            return {
                loadKey: 0
            }
        },
        watch: {
            statusList() {
                this.loadKey++
            }
        },
        computed: {
            statusList() {
                // if (this.$store.state.allStatuses.length > 0) {
                //     let sortedList = Array.from(this.$store.state.allStatuses)
                //     return sortedList.sort(function (a, b) {
                //         return a.timeStamp > b.timeStamp
                //     }).reverse()
                // }
                return this.$store.state.feedList
            }
        },
        async mounted() {
            this.$store.commit('setFeedList', false)
            this.$store.commit('setFeedPaginate', 0)
            await this.$store.dispatch('getFeed')
        }
    }
</script>

<style scoped>

</style>