<template>
<div id="app">
    <nav-bar :token="token" :userData="userData" />
    <div class="page-wrapper">
        <router-view v-on:logedIn="getToken" v-bind:token="token" />
    </div>
    <question-form v-on:closeForm="turOffBlur" />
    <questionnaire-form  v-on:closeForm="turOffBlur" />
    <q-action v-on:closeForm="turOffBlur" />
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import QuestionForm from '@/components/QuestionForm.vue'
import QuestionnaireForm from '@/components/QuestionnaireForm.vue'
import QAction from '@/components/QAction.vue'
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
        QuestionForm,
        QuestionnaireForm,
        QAction,
    },

    methods: {
        getToken: function() {
            this.token = this.$cookies.get('token')
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
                    this.userData.token = this.token
                    this.$store.commit('SET_USER_DATA', this.userData)
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        turOffBlur: function() {
            document.querySelector('.page-wrapper').classList.remove('blur')
        }
    },

    created() {
        this.getToken()
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');

* {
    margin: 0;
    padding: 0;
}

#app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.blur {
    -webkit-filter: blur(4px);
    -moz-filter: blur(4px);
    -o-filter: blur(4px);
    -ms-filter: blur(4px);
    filter: blur(4px);
    z-index: -1;
}

.box-shadow {
    -webkit-box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.32);
    -moz-box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.32);
    box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.32);
}

.wrapper {
    min-width: 960px;
    max-width: 1140px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
}

.ck-editor__editable_inline {
    min-height: 200px;
    padding: 0 0 0 20px !important;
}

</style>
