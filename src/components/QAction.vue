<template>
<div class="q-wrapper">
    <button class="close" @click="close">X</button>
    <h1>{{ title }}</h1>
    <h2>Question {{ questionNum }}</h2>

    <div v-for="q in questions" :key="q.id" class="questions">
        <div class="question-frame">
            <div v-html="q.text" class="q-text"></div>

            <span v-if="q.image">
                <img :src="imageUrl(q.image)" class="image" height="400px">
            </span>

            <div class="empty-form-error">
                <span>[The answer cannot be empty.]</span>
            </div>

            <div class="variants">
                <div v-if="q.correct_answers.length > 1" class="variant">
                    <div class="variant">
                        <input v-model.number="currentQuestionFormAnswers" type="checkbox" id="variant1"
                            name="variant1" value="1">
                        <label for="variant1">{{ q.answer1 }}</label>
                    </div>
                    <div class="variant">
                        <input v-model.number="currentQuestionFormAnswers" type="checkbox" id="variant2"
                            name="variant2" value="2">
                        <label for="variant2">{{ q.answer2 }}</label>
                    </div>
                    <div class="variant">
                        <input v-model.number="currentQuestionFormAnswers" type="checkbox" id="variant3"
                            name="variant3" value="3">
                        <label for="variant3">{{ q.answer3 }}</label>
                    </div>
                    <div class="variant">
                        <input v-model.number="currentQuestionFormAnswers" type="checkbox" id="variant4"
                            name="variant4" value="4">
                        <label for="variant4">{{ q.answer4 }}</label>
                    </div>
                </div>
                <div v-else class="variant">
                    <div class="variant">
                        <input v-model.number="currentQuestionFormAnswers" type="radio" id="variant1"
                            name="variant" value="1">
                        <label for="variant">{{ q.answer1 }}</label>
                    </div>
                    <div class="variant">
                        <input v-model.number="currentQuestionFormAnswers" type="radio" id="variant2"
                            name="variant" value="2">
                        <label for="variant">{{ q.answer2 }}</label>
                    </div>
                    <div class="variant">
                        <input v-model.number="currentQuestionFormAnswers" type="radio" id="variant3"
                            name="variant" value="3">
                        <label for="variant">{{ q.answer3 }}</label>
                    </div>
                    <div class="variant">
                        <input v-model.number="currentQuestionFormAnswers" type="radio" id="variant4"
                            name="variant" value="4">
                        <label for="variant">{{ q.answer4 }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <big-button class="next-bttn" bttnText="Reply" :bttnFunction="handleReply" /><br>
</div>
</template>

<script>
import axios from 'axios'
import BigButton from '@/components/BigButton.vue'
import { bus } from '../main'

const BASE_URL = '/api/'

export default {
    name: 'q-action',

    data() {
        return {
            title: '',
            questions: [],
            questionNum: 1,
            answers: [],

            pollResults: {
                'questionnaire': null,
                'user': null,
                'score': 0,
                'answers': {
                    // question_id: [1, 2, ...]
                },
                'results': {
                    // question_id, 'correct'/'wrong'
                }
            },

            currentQuestionFormAnswers: [],
        }
    },

    methods: {
        close: function() {
            document.querySelector('.q-wrapper').style.display = 'none'
            this.$emit('closeForm')
            this.$store.commit('SET_START_QUESTIONNAIRE_ID', null)
            this.questionNum = 1
        },

        next: function() {
            this.$emit('nextQuestion')
        },

        handleReply: function() {
            if (this.currentQuestionFormAnswers.length == 0) {
                document.querySelector('.empty-form-error ').style.display = 'block'
                return
            }
            document.querySelector('.empty-form-error ').style.display = 'none'

            const isCorrect = this.checkAnswer()

            this.pollResults.answers[this.currentQuestionId] = this.currentQuestionFormAnswers
            this.pollResults.results[this.currentQuestionId] = isCorrect ? 'correct' : 'wrong'

            const questionStats = {
                'question': this.currentQuestionId,
                'correct': isCorrect,
                'var_1_repl': this.currentQuestionFormAnswers.includes(1) ? 1 : 0,
                'var_2_repl': this.currentQuestionFormAnswers.includes(2) ? 1 : 0,
                'var_3_repl': this.currentQuestionFormAnswers.includes(3) ? 1 : 0,
                'var_4_repl': this.currentQuestionFormAnswers.includes(4) ? 1 : 0,
            }

            this.sendQuestionStats(questionStats)

            this.currentQuestionFormAnswers = []

            if (this.questionNum < this.questions.length) {
                this.next()
            } else {
                this.sendPollResults()
                this.close()
                bus.$emit('questionnaireUpdate')
            }
        },

        getQuestionnaireById: function() {
            const config = {
                headers: {
                    Authorization: `Token ${this.$cookies.get('token')}`
                }
            }

            const ID = this.$store.getters.START_QUESTIONNAIRE_ID

            axios.get(BASE_URL + '/questionnaire/' + ID, config)
                .then(response => {
                    this.title = response.data.title
                    this.questions = response.data.questions
                    this.pollResults.questionnaire = ID
                    this.pollResults.user = this.$store.getters.USER_DATA.id

                    this.questions.forEach(item => {
                        item.correct_answers = item.correct_answers.split(',').map(
                            x => { return +x })
                    })
                })
                .catch(err => {
                    console.error(err)
                })
        },

        nextQuestion: function() {
            document.querySelector('.question-frame').remove()
            this.questionNum++
            this.makeFirstFrameVisible()
        },

        makeFirstFrameVisible: function() {
            const frame = document.querySelector('.question-frame')
            frame.style.display = 'block'
        },

        checkAnswer: function() {
            if (typeof this.currentQuestionFormAnswers == 'number') {
                this.currentQuestionFormAnswers = [this.currentQuestionFormAnswers, ]
            }

            if (this.questions[this.questionNum - 1].correct_answers.length != this.currentQuestionFormAnswers
                .length) {
                return 0
            }

            let isCorrect
            this.questions[this.questionNum - 1].correct_answers.forEach((item) => {
                if (!this.currentQuestionFormAnswers.includes(item)) {
                    isCorrect = 0
                } else {
                    isCorrect = 1
                    this.pollResults.score += this.questions[this.questionNum - 1].score
                }
            });
            return isCorrect
        },

        sendQuestionStats(stats) {
            const headers = {
                Authorization: `Token ${this.$store.getters.USER_DATA.token}`
            }

            axios({
                method: 'put',
                url: `${BASE_URL}/question_stats/${this.currentQuestionId}`,
                data: stats,
                'headers': headers
            }).then(() => {

            }).catch(err => {
                console.error(err);
            })

            const ID = this.$store.getters.START_QUESTIONNAIRE_ID
            stats.poll = ID
            axios({
                method: 'put',
                url: `${BASE_URL}/question_in_poll_stats/${this.currentQuestionId}`,
                data: stats,
                'headers': headers
            }).then(() => {

            }).catch(err => {
                console.error(err);
            })
        },

        sendPollResults: function() {
            const headers = {
                Authorization: `Token ${this.$store.getters.USER_DATA.token}`
            }

            axios({
                method: 'post',
                url: `${BASE_URL}/poll_results/`,
                data: this.pollResults,
                'headers': headers,
            }).then(() => {

            }).catch(err => {
                console.error(err);
            })
        },

        imageUrl: function(img) {
            return BASE_URL + img
        }
    },

    mounted() {
        bus.$on('clickOnQuestionnaire', this.getQuestionnaireById)
        this.$on('nextQuestion', this.nextQuestion)
    },

    updated() {
        this.makeFirstFrameVisible()
    },

    components: {
        BigButton,
    },

    computed: {
        currentQuestionId() {
            return this.questions[this.questionNum - 1].id
        },
    }
}
</script>

<style scoped>
h1 {
    font-family: 'Comfortaa', cursive;
    color: rgba(0, 0, 0, 0.7);
    margin-top: 20px;
}

h2 {
    margin-top: 20px;
}

.q-wrapper {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 950px;
    max-height: 98vh;
    border: solid 1px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.82);
    padding: 0 8px;
    font-size: 14px;
}

.close {
    position: relative;
    float: right;
    margin-top: 6px;
    border: none;
    color: rgb(206, 20, 20);
    background: rgba(255, 255, 255, 0);
    font-size: 18px;
}

.close:focus {
    outline: none;
}

.questions {
    margin-top: 20px;
}

.question-frame {
    display: none;
    margin: 0 20px 20px 20px;
    padding: 14px 44px 14px 44px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    text-align: left;
    background-color: white;
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
}

.variants {
    margin-top: 20px;
    border-radius: 25px;
    padding: 14px 14px 14px 28px;
    background-color: rgba(85, 76, 185, 0.7);
    color: white;
}

label {
    font-size: 28px;
}

input[type=checkbox],
input[type=radio] {
    margin-right: 10px;
    transform: scale(1.8)
}

.next-bttn,
.done-bttn {
    margin: 0 22px 22px 0;
    float: right;
}

.done-bttn {
    display: none;
}

.empty-form-error {
    display: none;
    margin-top: 20px;
    position: relative;
    width: 100%;
    color: red;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}
</style>
