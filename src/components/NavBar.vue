<template>
<div class="">
    <nav>
        <router-link to="/">Main</router-link> |
        <span v-if="token">
            <a href="" v-on:click="deleteToken">Logout</a> |
        </span>
        <span v-else>
            <router-link to="/login">Login</router-link> |
        </span>
    </nav>
</div>
</template>

<script>
export default {
    name: 'NavBar',

    methods: {
        deleteToken: function() {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        }
    },

    props: ['token']
}
</script>

<style scoped>

</style>
