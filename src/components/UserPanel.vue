<template>
<div class="panel">
    <div v-if="userData">
        <h2>Hi, {{ userData.username }}</h2>
    </div>
</div>
</template>

<script>
export default {
    name: 'user-panel',

    computed: {
        userData() {
            return this.$store.getters.USER_DATA
        }
    },
}
</script>

<style scoped>
.panel {
    width: 30%;
    border-right: solid 1px rgb(0, 0, 0, 0.1);
    margin-right: 8px;
    padding-right: 8px;
}
</style>
