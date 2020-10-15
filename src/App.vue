<template>
<div id="app">
    <NavBar v-bind:token="token" />
    <router-view v-on:logedIn="getToken"/>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
    name: 'App',

    data() {
        return {
            token: ''
        }
    },

    components: {
        NavBar,
    },

    methods: {
        getToken: function() {
            const b = document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')
            this.token = b ? b.pop() : ''
        }
    },

    created() {
        this.getToken()
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
