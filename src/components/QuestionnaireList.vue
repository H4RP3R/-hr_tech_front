<template>
<div class="questionnaires">
    <div v-for="questionnaire in questionnaires" :key="questionnaire.id">
        <questionnaire-item :questionnaire="questionnaire" @clickOnQuestionnaire="editQuestionnaire" />
    </div>
</div>
</template>

<script>
import axios from 'axios'
import QuestionnaireItem from '@/components/QuestionnaireItem.vue'
import { bus } from '../main'

const URL = 'http://0.0.0.0:8000/questionnaire/'

export default {
    name: 'questionnaire-list',

    data() {
        return {
            questionnaires: [],
        }
    },

    methods: {
        getQuestionnaires: function() {
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

        editQuestionnaire: function(id) {
            this.$store.commit('SET_CURRENT_QUESTIONNAIRE_ID', id)
            document.querySelector('.page-wrapper').classList.add('blur')
            document.querySelector('.questionnaire-form').style.display = 'block'
        }
    },

    components: {
        QuestionnaireItem,
    },

    created() {
        this.getQuestionnaires()
        bus.$on('questionnaireUpdate', this.getQuestionnaires)
    }
}
</script>

<style scoped>
.questionnaires {
    display: none;
}
</style>
