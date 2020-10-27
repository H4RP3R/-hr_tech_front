<template>
<div class="wrapper">
    <user-panel />
    <div class="right-panel">
        <h1>Available questionnaires</h1>

        <div v-for="q in questionnaires" :key="q.id" class="questionnaires">
            <div class="item box-shadow" @click="startQuestionnaire(q.id)">
                <div class="q-text">
                    <span class="title">{{ q.title }}</span>
                    <div class="description">
                        <span>contains {{ q.questions.length }} </span>
                        <span v-if=" q.questions.length == 1">
                            question
                        </span>
                        <span v-else>questions</span>
                    </div>
                </div>
                <div class="tooltip">
                    <span>Click to start <i class="arrow right"></i></span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import UserPanel from '@/components/UserPanel.vue'
import { bus } from '../main'

const BASE_URL = 'http://localhost:8000/'

export default {
    name: 'Main',

    data() {
        return {
            questionnaires: [],
        }
    },

    methods: {
        getQuestionnaires: function() {
            if (this.$router.currentRoute.name == 'Login') {
                return
            }

            const config = {
                headers: {
                    Authorization: `Token ${this.token = this.$cookies.get('token')}`
                }
            }

            axios.get(BASE_URL + 'poll_results/', config)
                .then(response => {
                    this.pollssResults = response.data
                })
                .catch(err => {
                    console.error(err);
                })

            axios.get(BASE_URL + 'questionnaire/', config)
                .then(response => {
                    this.unfiltered = response.data
                    this.hideCompleted()
                })
                .catch(err => {
                    console.error(err);
                })
        },

        startQuestionnaire: function(id) {
            document.querySelector('.page-wrapper').classList.add('blur')
            document.querySelector('.q-wrapper').style.display = 'block'
            this.$store.commit('SET_START_QUESTIONNAIRE_ID', id)
            bus.$emit('clickOnQuestionnaire')
        },

        hideCompleted: function() {
            const config = {
                headers: {
                    Authorization: `Token ${this.token = this.$cookies.get('token')}`
                }
            }

            axios.get(BASE_URL + 'poll_results/', config)
                .then(response => {
                    this.pollssResults = response.data

                    if (this.pollssResults.length == 0) {
                        this.questionnaires = this.unfiltered
                        return
                    }

                    this.unfiltered.forEach((i) => {
                        this.pollssResults.forEach((j) => {
                            if (i.id == j.questionnaire.id && this.$store.getters
                                .USER_DATA.id == j.user.id) {
                                this.unfiltered = this.unfiltered.filter(
                                    item => item !== i)
                            }
                        });

                    });
                    this.questionnaires = this.unfiltered
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },

    created() {
        const token = this.$cookies.get('token')
        if (!token) {
            this.$router.push({ name: 'Login' })
        }
        this.getQuestionnaires()
        bus.$on('questionnaireUpdate', this.getQuestionnaires)
    },

    components: {
        UserPanel,
    },
}
</script>

<style scoped>
h1 {
    font-family: 'Comfortaa', cursive;
    color: rgba(0, 0, 0, 0.7);
}

.right-panel {
    width: 70%;
    max-height: calc(100vh - 100px);
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
}

.item {
    position: relative;
    margin: 12px;
    min-height: 60px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    padding-top: 12px;
    background-color: rgba(76, 185, 117, 0.8);
    color: rgba(255, 255, 255, 0.7);
}

.q-text {
    transition: 1s;
}

.item:hover .tooltip {
    right: 4%;
    transition: 1.2s;
}

.item:hover .q-text {
    margin-right: 38%;
    transition: 1.2s;
}

.title {
    color: white;
    text-decoration: underline;
}

.description {
    margin-top: 8px;
}

.tooltip {
    position: absolute;
    right: -108px;
    bottom: 38%;
    color: white;
    transition: 1s;
}

.arrow {
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
}

.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}
</style>
