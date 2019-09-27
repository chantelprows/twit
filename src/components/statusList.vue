<template>
    <section v-for="status in statusList">

    </section>
</template>

<script>
    export default {
        name: "statusList",
        props: {
            statusList: {
                list: []
            }
        }
    }
</script>

<style scoped>

</style>