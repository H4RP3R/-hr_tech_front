<template>
<div class="wrapper">
    <draggable class="list question-list" :list="questions" group="q">
        <div v-for="question in questions" :key="question.id">
            <compact-question-item :question="question" class="item"/>
        </div>
    </draggable>

    <draggable class="list included-questions" :list="includedQuestions" group="q" @change="commitChanges">
        <div v-for="question in includedQuestions" :key="question.id">
            <compact-question-item :question="question" />
        </div>
    </draggable>
</div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import CompactQuestionItem from '@/components/CompactQuestionItem.vue'

const URL = 'http://127.0.0.1:8000/questions/'

export default {
    name: 'compact-question-list',

    data() {
        return {
            questions: [],
            includedQuestions: [],
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

        commitChanges: function() {
            this.$store.commit('SET_INCLUDED_QUESTIONS', this.includedQuestions)
        }
    },

    components: {
        draggable,
        CompactQuestionItem,
    },

    mounted() {
        this.getQuestions()
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.list {
    padding: 4px;
    margin-bottom: 9px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    max-height: 600px;
    overflow-x: auto;
    overflow-y: hidden;
}

.detail-text {
    display: none;
}

.item:hover {

}

.question-list {
    width: 48%;

}

.included-questions {
    width: 48%;
}
</style>
