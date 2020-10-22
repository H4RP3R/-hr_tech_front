<template>
<div class="questions">
    <div v-for="question in questions" :key="question.id">
        <question-item :question="question" @clickOn="editQuestion"/>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import QuestionItem from '@/components/QuestionItem.vue'
import { bus } from '../main'

const URL = 'http://127.0.0.1:8000/questions/'

export default {
    name: 'question-list',

    data() {
        return {
            questions: [],
        }
    },

    methods: {
        getQuestions: function() {
            const config = {
                headers: {
                    Authorization: `Token ${this.token = this.$cookies.get('token')}`
                }
            }

            axios.get(URL, config)
                .then(response => {
                    this.questions = response.data
                })
                .catch(err => {
                    console.error(err);
                })
        },

        editQuestion: function(id) {
            this.$store.commit('SET_CURRENT_QUESTION_ID', id)
            document.querySelector('.page-wrapper').classList.add('blur')
            document.querySelector('.qestion-form').style.display = 'block'
        }
    },

    components: {
        QuestionItem,
    },

    mounted() {
        this.getQuestions()
        bus.$on('questionsUpdate', this.getQuestions)
    }
}
</script>

<style scoped>
</style>
