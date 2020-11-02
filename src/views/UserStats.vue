<template>
<div class="wrapper">
    <div class="user-list panel">
        <div v-for="user in userList" :key="user.id">
            <div v-if="!user.profile.is_hr_staff" @click="$emit('clickOnUser', user.id)" class="user-item box-shadow"
                tabindex="0">
                <span class="username">{{ user.username }}</span>
            </div>
        </div>
    </div>

    <user-stats-panel :stats="statsForUser" />
</div>
</template>

<script>
import axios from 'axios'
import UserStatsPanel from '@/components/UserStatsPanel.vue'

const BASE_URL = '/api/'

export default {
    name: 'UserStats',

    data() {
        return {
            userList: [],
            statsForUser: [],
        }
    },

    components: {
        UserStatsPanel,
    },

    methods: {
        getUserList: function() {
            if (this.$router.currentRoute.name == 'Login') {
                return
            }

            const config = {
                headers: {
                    Authorization: `Token ${this.$cookies.get('token')}`
                }
            }

            axios.get(BASE_URL + 'user_list/', config)
                .then(response => {
                    this.userList = response.data
                }).catch(err => {
                    console.error(err);
                })
        },

        getStatsForUser(id) {
            const config = {
                headers: {
                    Authorization: `Token ${this.$cookies.get('token')}`
                }
            }

            axios.get(BASE_URL + `poll_results_for_user/${id}`, config)
                .then(response => {
                    this.statsForUser = response.data
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

        this.getUserList()
        this.$on('clickOnUser', this.getStatsForUser)
    },
}
</script>

<style scoped>
.panel {
    width: 30%;
    border-right: solid 1px rgb(0, 0, 0, 0.1);
    margin-right: 8px;
    padding-right: 8px;
}

.user-list {
    width: 30%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

}

.user-item {
    border: solid 1px rgba(0, 0, 0, 0.3);
    margin: 6px;
    height: 50px;
    position: relative;
    padding-top: 20px;
    background-color: rgba(76, 185, 117, 0.7);
    color: rgba(250, 250, 250, 0.8);
}

.user-item:hover {
    background-color: rgba(85, 76, 185, 0.5);
    transition: background-color 1s;
}

.user-item:focus {
    outline: 3px solid white;
    outline-offset: -6px;
    color: white;
}

.username {
    font-size: 24px;
}
</style>
