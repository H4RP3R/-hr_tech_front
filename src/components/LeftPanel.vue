<template>
<div class="panel">
    <h2>{{ userData.username }}</h2>
</div>
</template>

<script>
export default {
    name: 'left-panel',

    data() {
        return {

        }
    },

    computed: {
        userData() {
            return this.$store.getters.USER_DATA
        }
    }
}
</script>

<style scoped>
.panel {
    width: 33%;
}
</style>
