<template>
    <section>
        <br><br>
        <add-status style="padding-left: 25%; padding-right: 25%;"></add-status>
        <br><br>
        <status-list :config="statusList" style="margin-left: 25%; margin-right: 25%;"></status-list>
    </section>
</template>

<script>
    import StatusList from './status-list'
    import AddStatus from './add-status'

    export default {
        name: "feed",
        components: {StatusList, AddStatus},
        computed: {
            statusList() {
                let sortedList = Array.from(this.$store.state.allStatuses)
                return sortedList.sort(function(a, b){ return a.timeStamp > b.timeStamp}).reverse()
            }
        }
    }
</script>

<style scoped>

</style>