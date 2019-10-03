<template>
    <section>
        <br>
        <status-list :config="statusList" style="margin-left: 25%; margin-right: 25%;"></status-list>
    </section>
</template>

<script>
    import StatusList from './status-list'

    export default {
        name: "feed",
        components: {StatusList},
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