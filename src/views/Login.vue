<template>
<div class="login" @submit="sendForm" novalidate="true">
    <form class="login-form" method="post">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
            </ul>
        </p>

        <label for="username">Username</label>
        <input v-model="username" type="text" name="username" id="username" value=""><br>

        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" id="password" value=""><br>

        <input type="submit" name="" value="Sign in">
    </form>
</div>
</template>

<script>
import axios from 'axios'


const URL = 'http://127.0.0.1:8000/api-token-auth/'

export default {
    name: 'Login',

    data() {
        return {
            errors: [],
            username: '',
            password: '',
        }
    },

    methods: {
        checkForm: function(e) {
            e.preventDefault()
        },

        sendForm: function(e) {
            e.preventDefault()

            axios({
                method: 'post',
                url: URL,
                data: {
                    'username': this.username,
                    'password': this.password,
                }
            }).then((response)=> {
                this.username = ''
                this.password = ''
                console.log(response.data);
            }).catch((err)=> {
                console.error(err)
            })
        }
    }
}
</script>

<style scoped>

</style>
