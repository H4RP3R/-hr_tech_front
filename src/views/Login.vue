<template>
<div class="wrapper">
    <div class="login" @submit="sendForm" novalidate="true">
        <form class="login-form" method="post">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul class="error">
                    <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
                </ul>
            </p>

            <label for="username">Username</label>
            <input v-model="username" type="text" name="username" id="username" value=""><br>

            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" id="password" value=""><br>

            <div class="">
                <input type="submit" name="" value="Sign in">
            </div>
        </form>
    </div>
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

    props: ['token'],

    methods: {
        checkForm: function(event) {
            event.preventDefault()
        },

        sendForm: function(event) {
            event.preventDefault()

            axios({
                method: 'post',
                url: URL,
                data: {
                    'username': this.username,
                    'password': this.password,
                }
            }).then((response) => {
                this.username = ''
                this.password = ''
                document.cookie = `token=${response.data.token}`
                this.$router.push({ name: 'Main' })
                this.$emit('logedIn')
            }).catch((err) => {
                console.error(err)
            })
        },
    },

    created() {
        if (this.token) {
            this.$router.push({ name: 'Main' })
        }
    }
}
</script>

<style scoped>
.login {
    margin: auto;
    margin-top: 20px;
}

.login label {
    text-transform: uppercase;
    font-size: 14px;
    margin: 3px;
}

input[type=text],
input[type=password] {
    outline: none;
    border: solid 1px rgb(31, 137, 229);
    font-size: 18px;
    padding: 4px;
}

.login-form {
    display: flex;
    flex-direction: column;
}

input[type=submit] {
    border: solid 1px rgb(85, 76, 185);
    padding: 0 2px;
    background-color: white;
    transition: 1s;
    padding: 4px 12px;
    font-size: 16px;
}

input[type=submit]:hover {
    color: white;
    background-color: rgb(85, 76, 185);
    transition: 1s;
}

.error {
    color: red;
}
</style>
