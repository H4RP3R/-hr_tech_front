<template>
<div class="qestion-form">
    <button class="close" @click="closeForm">X</button>
    <h2>Question</h2>
    <form class="" @submit="sendForm" action="" method="post">
        <ckeditor :editor="editor" v-model="text" :config="editorConfig"></ckeditor>

        <div class="answers">
            <div class="answer-group">
                <label for="answer1">Answer 1</label>
                <input v-model="answer1" type="text" name="answer1" value="">
                <label for="correct1">correct</label>
                <input v-model="correctAnswers" type="checkbox" name="correct1" value="1"><br>

                <label for="answer2">Answer 2</label>
                <input v-model="answer2" type="text" name="answer2" value="">
                <label for="correct2">correct</label>
                <input v-model="correctAnswers" type="checkbox" name="correct2" value="2">
            </div>

            <div class="answer-group">
                <label for="answer3">Answer 3</label>
                <input v-model="answer3" type="text" name="answer3" value="">
                <label for="correct3">correct</label>
                <input v-model="correctAnswers" type="checkbox" name="correc31" value="3"><br>

                <label for="answer4">Answer 4</label>
                <input v-model="answer4" type="text" name="answer4" value="">
                <label for="correct4">correct</label>
                <input v-model="correctAnswers" type="checkbox" name="correct4" value="4">
            </div>
        </div>

        <div class="bottom-section">
            <label for="has-correct-answer">Has correct answer</label>
            <input v-model="hasCorrectAnswer" type="checkbox" name="has-correct-answer" value=""><br>

            <label for="score">Score</label>
            <input v-model="score" type="number" name="score" min="0"><br>

            <input class="submit-bttn" type="submit" name="submit" value="Create">
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


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
            score: 0,

            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                removePlugins: ['ImageToolbar', 'ImageUpload', 'MediaEmbed']
            }
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
    },
}
</script>

<style>
.qestion-form {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 760px;
    border: solid 1px rgba(0, 0, 0, 0.3);
    padding: 0 8px;
    font-size: 14px;
}

.ck-editor__editable_inline {
    min-height: 200px;
}

.close {
    position: relative;
    float: right;
    margin-top: 6px;
    border: none;
    color: rgb(206, 20, 20);
    background-color: white;
    font-size: 18px;
}

.close:focus {
    outline: none;
}

.answers,
.bottom-section {
    display: flex;
    margin-top: 10px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
    justify-content: center;
}

.answer-group {
    width: 50%;
}

.bottom-section {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
}

.submit-bttn {
    margin-left: 10px;
}

label {
    margin: 0 4px 0 16px;
}

input[type=text] {
    margin-top: 8px;
    border: solid 1px rgba(0, 0, 0, 0.3);
}

input[type=number] {
    border: solid 1px rgba(0, 0, 0, 0.3);
    width: 60px;
}

input[type=text]:focus,
input[type=number]:focus {
    outline: none;
    border: solid 1px rgb(31, 137, 229);
}

input[type=submit] {
    border: solid 1px rgb(85, 76, 185);
    background-color: white;
    transition: 1s;
}

input[type=submit]:hover {
    color: white;
    background-color: rgb(85, 76, 185);
    transition: 1s;
}
</style>
