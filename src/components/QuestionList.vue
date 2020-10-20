<template>
<div>
    <div v-for="question in questions" :key="question.id" class="">
        <question-item :question="question" />
    </div>
</div>
</template>

<script>
import axios from 'axios'
import QuestionItem from '@/components/QuestionItem.vue'

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
        }
    },

    components: {
        QuestionItem,
    },

    mounted() {
        this.getQuestions()
    }
}
</script>

<style scope>

</style>
