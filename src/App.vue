<template>
<div id="app">
    <NavBar :token="token" :userData="userData" />
    <router-view v-on:logedIn="getToken" v-bind:token="token" />
</div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import axios from 'axios'


const URL = 'http://127.0.0.1:8000/'

export default {
    name: 'App',

    data() {
        return {
            token: '',
            userData: {},
        }
    },

    components: {
        NavBar,
    },

    methods: {
        getToken: function() {
            const b = document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')
            this.token = b ? b.pop() : ''
            if (this.token) {
                this.getUserProfile()
            }
        },

        getUserProfile: function() {
            const config = {
                headers: {
                    Authorization: `Token ${this.token}`
                }
            }

            axios.get(URL + 'current_user_data/', config)
                .then((response) => {
                    this.userData = response.data
                    this.$store.commit('SET_USER_DATA', this.userData)
                })
                .catch((err) => {
                    console.log(err);
                })
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
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
