<template>
<div class="wrapper">
    <div v-if="questionsStats.length === 0" class="no-data">
        <span>no data</span>
    </div>
    <div v-for="stat in questionsStats" :key="stat.id" class="q-bar-item">
        <span v-html="stat.question.text" class="question-text"></span>
        <question-bar :chartData="stat" />
    </div>
</div>
</template>

<script>
import axios from 'axios'
import QuestionBar from '@/components/QuestionBar.vue'

const URL = 'http://0.0.0.0:8000/question_stats/'

export default {
    name: 'question-stats',

    data() {
        return {
            questionsStats: []
        }
    },

    methods: {
        getQuestionsStats: function() {
            if (this.$router.currentRoute.name == 'Login') {
                return
            }

            const config = {
                headers: {
                    Authorization: `Token ${this.$cookies.get('token')}`
                }
            }

            axios.get(URL, config)
                .then(response => {
                    this.questionsStats = response.data
                }).catch(err => {
                    console.error(err);
                })
        }
    },

    created() {
        const token = this.$cookies.get('token')
        if (!token) {
            this.$router.push({ name: 'Login' })
        }

        this.getQuestionsStats()
    },

    props: ['dataList', ],

    components: {
        QuestionBar,
    },
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-grow: 3;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
}

.q-bar-item {
    width: 49%;
}

.question-text {
    font-size: 14px;
    align-self: flex-start;
}
</style>
