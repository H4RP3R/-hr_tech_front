<template>
<div class="qestion-form">
    <button class="close" @click="closeForm">X</button>
    <div v-if="questionId">
        <h2>Question id: {{ questionId }}</h2>
    </div>
    <div v-else>
        <h2>New Question</h2>
    </div>
    <form class="" @submit="sendForm" action="" method="post">
        <ckeditor :editor="editor" v-model="text" :config="editorConfig"></ckeditor>

        <div class="image-field">

            <input @change="handleFileUpload()" ref="file" type="file" name="img" accept="image/*"
                class="inputfile">
            <label for="file">
                <span v-if="image">
                    {{ image.name }}
                </span>
                <span v-else>
                    Choose a file
                </span>
            </label>
        </div>

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
                <input v-model="correctAnswers" type="checkbox" name="correct3" value="3"><br>

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

            <input class="submit-bttn" type="submit" name="submit" :value="bttnText">
            <span v-if="bttnText=='Update'">
                <button @click="deleteQuestion" type="button" class="delete-bttn" name="delete">Delete</button>
            </span>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { bus } from '../main'


const BASE_URL = 'http://127.0.0.1:8000/questions/'


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
            image: null,

            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                removePlugins: ['ImageToolbar', 'ImageUpload', 'MediaEmbed']
            },
        }
    },

    methods: {
        closeForm: function() {
            this.text = ''
            this.answer1 = ''
            this.answer2 = ''
            this.answer3 = ''
            this.answer4 = ''
            this.hasCorrectAnswer = false
            this.correctAnswers = []
            this.score = 0
            this.image = null
            document.querySelector('.qestion-form').style.display = 'none'
            this.$emit('closeForm')
            this.$store.commit('SET_CURRENT_QUESTION_ID', null)
        },

        sendForm: function(event) {
            event.preventDefault()

            const headers = {
                Authorization: `Token ${this.$store.getters.USER_DATA.token}`
            }

            let correctAnswers = []
            if (this.correctAnswers.length) {
                correctAnswers = this.correctAnswers.map(x => +x)
            }
            const method = this.questionId ? 'put' : 'post'
            const URL = this.questionId ? BASE_URL + this.questionId : BASE_URL

            const formData = new FormData()

            const data = {
                'text': this.text,
                'answer1': this.answer1,
                'answer2': this.answer2,
                'answer3': this.answer3,
                'answer4': this.answer4,
                'has_correct_answer': this.hasCorrectAnswer,
                'correct_answers': correctAnswers.join(),
                'score': +this.score,
            }

            if (this.image !== null) {
                data['image'] = this.image
            }

            for (let key in data) {
                formData.append(key, data[key])
            }


            axios({
                method: method,
                url: URL,
                data: formData,
                'headers': headers
            }).then(() => {
                this.closeForm()
                bus.$emit('questionsUpdate')
            }).catch((err) => {
                console.error(err)
            })
        },

        getQuestionById: function() {
            const config = {
                headers: {
                    Authorization: `Token ${this.token = this.$cookies.get('token')}`
                }
            }

            axios.get(BASE_URL + this.questionId, config)
                .then(response => {
                    this.text = response.data.text
                    this.answer1 = response.data.answer1
                    this.answer2 = response.data.answer2
                    this.answer3 = response.data.answer3
                    this.answer4 = response.data.answer4
                    this.hasCorrectAnswer = response.data.has_correct_answer
                    this.correctAnswers = response.data.correct_answers.split(',')
                    this.score = response.data.score
                })
                .catch(err => {
                    console.error(err)
                })
        },

        handleFileUpload() {
            this.image = this.$refs.file.files[0]
        },

        deleteQuestion() {
            const headers = {
                Authorization: `Token ${this.token = this.$cookies.get('token')}`
            }

            axios({
                method: 'delete',
                url: BASE_URL + this.questionId,
                'headers': headers
            }).then(() => {
                this.closeForm()
                bus.$emit('questionsUpdate')
            }).catch((err) => {
                console.error(err)
            })
        }
    },

    computed: {
        questionId() {
            return this.$store.getters.CURRENT_QUESTION_ID
        },
        bttnText() {
            return (this.questionId ? 'Update' : 'Create')
        },
    },

    created() {
        bus.$on('haveQuestionId', this.getQuestionById);
    },
}
</script>

<style scoped>
h2 {
    margin: 20px;
}

.qestion-form {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 760px;
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

.image-field {
    margin-top: 12px;
    border: solid 1px rgba(0, 0, 0, 0.1);
}

.inputfile {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 160px;
    margin: 4px;
    padding: 5px;
}

.inputfile+label::before {
    content: "📌";
    margin-right: 4px;
}

.inputfile+label {
    margin: 8px;
    padding: 4px;
    border: solid 1px rgba(85, 76, 185, 0.9);
    display: inline-block;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.inputfile+label {
    cursor: pointer;
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
    padding: 0 2px;
    background-color: white;
    transition: 1s;
}

input[type=submit]:hover {
    color: white;
    background-color: rgb(85, 76, 185);
    transition: 1s;
}

.delete-bttn {
    border: solid 1px red;
    padding: 0 2px;
    background-color: white;
    transition: 1s;
    margin-left: 12px;
    color: red;
}

.delete-bttn:hover {
    background-color: red;
    padding: 0 2px;
    color: white;
    transition: 1s;
    margin-left: 12px;
}
</style>
