<template>
<div class="questionnaires">
    <div v-for="questionnaire in questionnaires" :key="questionnaire.id">
        <questionnaire-item :questionnaire="questionnaire" />
    </div>
</div>
</template>

<script>
import axios from 'axios'
import QuestionnaireItem from '@/components/QuestionnaireItem.vue'

const URL = 'http://localhost:8000/questionnaire/'

export default {
    name: 'questionnaire-list',

    data() {
        return {
            questionnaires: [],
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
                    this.questionnaires = response.data
                })
                .catch(err => {
                    console.error(err);
                })
        },
    },

    components: {
        QuestionnaireItem,
    },

    created() {
        this.getQuestions()
    }
}
</script>

<style scoped>
.questionnaires {
    display: none;
}
</style>
