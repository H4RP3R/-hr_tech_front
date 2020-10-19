<template>
<div class="qestion-form">
    <h3>Question</h3>
    <button class="close" @click="closeForm">X</button>
    <form class="" @submit="sendForm" action="" method="post">
        <label for="text">Question text</label><br>
        <textarea v-model="text" name="text" rows="8" cols="80"></textarea><br>

        <label for="answer1">Answer 1</label>
        <input v-model="answer1" type="text" name="answer1" value="">
        <label for="correct1">correct</label>
        <input v-model="correctAnswers" type="checkbox" name="correct1" value="1"><br>

        <label for="answer2">Answer 2</label>
        <input v-model="answer2" type="text" name="answer2" value="">
        <label for="correct2">correct</label>
        <input v-model="correctAnswers" type="checkbox" name="correct2" value="2"><br>

        <label for="answer3">Answer 3</label>
        <input v-model="answer3" type="text" name="answer3" value="">
        <label for="correct3">correct</label>
        <input v-model="correctAnswers" type="checkbox" name="correc31" value="3"><br>

        <label for="answer4">Answer 4</label>
        <input v-model="answer4" type="text" name="answer4" value="">
        <label for="correct4">correct</label>
        <input v-model="correctAnswers" type="checkbox" name="correct4" value="4"><br>

        <label for="has-correct-answer">Has correct answer</label>
        <input v-model="hasCorrectAnswer" type="checkbox" name="has-correct-answer" value=""><br>

        <label for="score">Score</label>
        <input v-model="score" type="number" name="score" min="0"><br>

        <input type="submit" name="submit" value="Create">
    </form>
</div>
</template>

<script>
import axios from 'axios'


const URL = 'http://127.0.0.1:8000/questions/'

export default {
    name: 'question-form',

    data() {
        return {
            text: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            hasCorrectAnswer: false,
            correctAnswers: [],
            score: 0
        }
    },

    methods: {
        closeForm: function() {
            document.querySelector('.qestion-form').style.display = 'none'
            this.$emit('closeForm')
        },

        sendForm: function(event) {
            event.preventDefault()

            const headers = {
                Authorization: `Token ${this.$store.getters.USER_DATA.token}`
            }

            const correctAnswers = this.correctAnswers.map(x => +x)

            axios({
                method: 'post',
                url: URL,
                data: {
                    'text': this.text,
                    'answer1': this.answer1,
                    'answer2': this.answer2,
                    'answer3': this.answer3,
                    'answer4': this.answer4,
                    'has_correct_answer': this.hasCorrectAnswer,
                    'correct_answers': correctAnswers.join(),
                    'score': +this.score,
                },
                'headers': headers
            }).then(() => {
                this.text = ''
                this.answer1 = ''
                this.answer2 = ''
                this.answer3 = ''
                this.answer4 = ''
            }).catch((err) => {
                console.error(err)
            })
        }
    }
}
</script>

<style>
.qestion-form {
    display: block;
    width: 760px;
}
</style>
