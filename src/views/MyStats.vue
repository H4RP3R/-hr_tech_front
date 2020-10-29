<template>
<div class="wrapper">
    <div class="total-stat-panel">
        <h2>My Achievements</h2>

        <div class="achievements">
            <div class="achievement-item">
                <b>Polls Completed: </b><span>{{ totalStats.pollsСompleted }}</span>
            </div>
            <div class="achievement-item">
                <b>Qestions Answered: </b><span>{{ totalStats.questionsAnswered }}</span>
            </div>
            <div class="achievement-item">
                <b>Correct Answeres: </b><span>{{ totalStats.correctAnswersPercent }}%</span>
            </div>
        </div>
    </div>

    <user-stats-panel :stats="statsForUser" />
</div>
</template>

<script>
import axios from 'axios'
import UserStatsPanel from '@/components/UserStatsPanel.vue'
import { bus } from '../main'

const BASE_URL = 'http://127.0.0.1:8000/'

export default {
    name: 'MyStats',

    data() {
        return {
            statsForUser: [],
            totalStats: {
                pollsСompleted: 0,
                questionsAnswered: 0,
                correctAnswersPercent: 0,
            },
        }
    },

    methods: {
        getStatsForUser() {
            const config = {
                headers: {
                    Authorization: `Token ${this.$cookies.get('token')}`
                }
            }

            axios.get(BASE_URL + `poll_results_for_user/${this.$store.getters.USER_DATA.id}`,
                    config)
                .then(response => {
                    this.statsForUser = response.data
                    this.calcTotalStats()
                }).catch(err => {
                    console.error(err);
                })
        },

        calcTotalStats: function() {
            this.totalStats.pollsСompleted = this.statsForUser.length

            this.statsForUser.forEach(item => {
                this.totalStats.questionsAnswered += item.questionnaire.questions.length
            });

            let correct = 0
            let wrong = 0
            this.statsForUser.forEach(item => {
                Object.values(item.results).forEach(item => {
                    if (item === 'correct') {
                        correct++
                    } else if (item === 'wrong') {
                        wrong++
                    }
                })
            })
            const res = ((correct * 100) / (correct + wrong))
            this.totalStats.correctAnswersPercent =  Number.parseFloat(res).toPrecision(3);
        }
    },

    components: {
        UserStatsPanel,
    },

    mounted() {
        const token = this.$cookies.get('token')
        if (!token) {
            this.$router.push({ name: 'Login' })
        }

        if (this.$store.getters.USER_DATA.id) {
            this.$nextTick(this.getStatsForUser)
        }
    },

    created() {
        bus.$on('haveUserData', this.getStatsForUser)
    }
}
</script>

<style scoped>
.total-stat-panel {
    width: 30%;
    border-right: solid 1px rgb(0, 0, 0, 0.1);
    margin-right: 8px;
    padding-right: 8px;
}

.achievements {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 12px;
    padding: 12px 32px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.achievement-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}
</style>
