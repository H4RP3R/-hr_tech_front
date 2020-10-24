<template>
<div class="q-wrapper">
    <button class="close" @click="close">X</button>
    <h1>{{ title }}</h1>
    <h2>Question {{ questionNum }}</h2>

    <div v-for="q in questions" :key="q.id" class="questions">
        <div class="question-frame">
            <div v-html="q.text" class="q-text"></div>

            <div class="variants">
                <div v-if="q.correct_answers.length > 1" class="variant">
                    <div class="variant">
                        <input type="checkbox" id="variant1" name="variant1" :value="q.answer1">
                        <label for="variant1">{{ q.answer1 }}</label>
                    </div>
                    <div class="variant">
                        <input type="checkbox" id="variant2" name="variant2" :value="q.answer2">
                        <label for="variant2">{{ q.answer2 }}</label>
                    </div>
                    <div class="variant">
                        <input type="checkbox" id="variant3" name="variant3" :value="q.answer3">
                        <label for="variant3">{{ q.answer3 }}</label>
                    </div>
                    <div class="variant">
                        <input type="checkbox" id="variant4" name="variant4" :value="q.answer4">
                        <label for="variant4">{{ q.answer4 }}</label>
                    </div>
                </div>
                <div v-else class="variant">
                    <div class="variant">
                        <input type="radio" id="variant1" name="variant" :value="q.answer1">
                        <label for="variant">{{ q.answer1 }}</label>
                    </div>
                    <div class="variant">
                        <input type="radio" id="variant2" name="variant" :value="q.answer2">
                        <label for="variant">{{ q.answer2 }}</label>
                    </div>
                    <div class="variant">
                        <input type="radio" id="variant3" name="variant" :value="q.answer3">
                        <label for="variant">{{ q.answer3 }}</label>
                    </div>
                    <div class="variant">
                        <input type="radio" id="variant4" name="variant" :value="q.answer4">
                        <label for="variant">{{ q.answer4 }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <big-button class="next-bttn" bttnText="Reply" :bttnFunction="next" /><br>
    <big-button class="done-bttn" bttnText="Done" :bttnFunction="close" /><br>
</div>
</template>

<script>
import axios from 'axios'
import BigButton from '@/components/BigButton.vue'
import { bus } from '../main'

const URL = 'http://127.0.0.1:8000/questionnaire/'

export default {
    name: 'q-action',

    data() {
        return {
            title: '',
            questions: [],
            questionNum: 1,
            answers: [],
        }
    },

    methods: {
        close: function() {
            document.querySelector('.q-wrapper').style.display = 'none'
            this.$emit('closeForm')
            this.$store.commit('SET_START_QUESTIONNAIRE_ID', null)
            document.querySelector('.next-bttn').style.display = 'block'
            document.querySelector('.done-bttn').style.display = 'none'
            this.questionNum = 1
        },

        next: function() {
            this.$emit('nextQuestion')
        },

        getQuestionnaireById: function() {
            const config = {
                headers: {
                    Authorization: `Token ${this.$cookies.get('token')}`
                }
            }

            const ID = this.$store.getters.START_QUESTIONNAIRE_ID
            axios.get(URL + ID, config)
                .then(response => {
                    this.title = response.data.title
                    this.questions = response.data.questions
                })
                .catch(err => {
                    console.error(err)
                })
        },

        nextQuestion: function() {
            document.querySelector('.question-frame').remove()
            this.questionNum++
            if (this.questionNum < this.questions.length) {
                this.makeFirstFrameVisible()
            } else {
                document.querySelector('.next-bttn').style.display = 'none'
                document.querySelector('.done-bttn').style.display = 'block'
            }
        },

        makeFirstFrameVisible: function() {
            const frame = document.querySelector('.question-frame')
            frame.style.display = 'block'
        },
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
    transform: scale(1.2)
}

.next-bttn,
.done-bttn {
    margin: 0 22px 22px 0;
    float: right;
}

.done-bttn {
    display: none;
}
</style>
