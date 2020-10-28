<template>
<div class="wrapper">
    <div class="poll-wrapper">
        <div v-for="stat in totalPollStats" :key="stat.id">
            <h1>{{ stat[0].poll.title }}</h1>
            <poll-chart :dataList="stat" />
            <hr>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import PollChart from '@/components/PollChart.vue'

const URL = 'http://localhost:8000/question_in_poll_stats/'

export default {
    name: 'polls-stats',

    data() {
        return {
            totalPollStats: {},
        }
    },

    methods: {
        getPollsStats: function() {
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
                    this.totalPollStats = this.handleStats(response.data)
                }).catch(err => {
                    console.error(err);
                })
        },

        handleStats: function(stats) {
            const statsByPoll = {}
            stats.forEach((item) => {
                if (statsByPoll[item.poll.id] === undefined) {
                    statsByPoll[item.poll.id] = []
                }
                statsByPoll[item.poll.id].push(item)
            });
            return statsByPoll
        },
    },

    components: {
        PollChart,
    },

    created() {
        const token = this.$cookies.get('token')
        if (!token) {
            this.$router.push({ name: 'Login' })
        }

        this.getPollsStats()
    }
}
</script>

<style scoped>
.poll-wrapper {
    display: flex;
    flex-direction: column;
}

hr {
    margin-bottom: 28px;
}
</style>
