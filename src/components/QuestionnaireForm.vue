<template>
<div class="questionnaire-form">
    <button class="close" @click="closeForm">X</button>
    <div v-if="questionnaireId">
        <h2>Questionnaire id: {{ questionnaireId }}</h2>
    </div>
    <div v-else>
        <h2>New Questionnaire</h2>
    </div>
    <form @submit="sendForm" action="" method="post">
        <label for="title">Title</label>
        <input v-model="title" type="text" name="title" id="title" value="">
        <input class="submit-bttn" type="submit" name="submit" :value="bttnText">

        <div class="headers">
            <h3>All questions</h3>
            <h3>Drag here to include</h3>
        </div>
        <p>⟺</p>
        <compact-question-list :questions="questions" :includedQuestions="includedQuestions" />
    </form>
</div>
</template>

<script>
import axios from 'axios'
import CompactQuestionList from '@/components/CompactQuestionList.vue'
import { bus } from '../main'


const BASE_URL = 'http://127.0.0.1:8000/'

export default {
    name: 'questionnaire-form',

    data() {
        return {
            title: '',
            questions: [],
            includedQuestions: [],
        }
    },

    methods: {
        closeForm: function() {
            document.querySelector('.questionnaire-form').style.display = 'none'
            this.$emit('closeForm')
            this.includedQuestions = []
            this.$store.commit('SET_CURRENT_QUESTIONNAIRE_ID', null)
            this.title = ''
        },

        sendForm: function(event) {
            event.preventDefault()

            const method = this.questionnaireId ? 'put' : 'post'
            const URL = this.questionnaireId ? BASE_URL + 'questionnaire/' + this.questionnaireId :
                BASE_URL + 'questionnaire/'
            const headers = {
                Authorization: `Token ${this.$store.getters.USER_DATA.token}`
            }

            axios({
                method: method,
                url: URL,
                data: {
                    'title': this.title,
                    'questions': this.$store.getters.INCLUDED_QUESTIONS.map(q => q.id)
                },
                'headers': headers
            }).then(() => {
                this.title = ''
                bus.$emit('questionnaireUpdate')
                this.closeForm()
            }).catch(err => {
                console.error(err)
            })
        },

        getQuestionnaireById: function() {
            const config = {
                headers: {
                    Authorization: `Token ${this.$cookies.get('token')}`
                }
            }

            axios.get(BASE_URL + 'questionnaire/' + this.questionnaireId, config)
                .then(response => {
                    this.title = response.data.title
                    this.includedQuestions = response.data.questions
                    this.getQuestions()
                })
                .catch(err => {
                    console.error(err)
                })
        },

        getQuestions: function() {
            const token = this.$cookies.get('token')

            if (!token) {
                return
            }

            const config = {
                headers: {
                    Authorization: `Token ${token}`
                }
            }

            axios.get(BASE_URL + 'questions/', config)
                .then(response => {
                    if (!this.includedQuestions.length) {
                        this.questions = response.data
                    } else {
                        let questions = response.data
                        questions.forEach((item) => {
                            if (this.includedQuestions.map(x => x.id).includes(item
                                    .id)) {
                                questions = questions.filter(i => i !== item)
                            }
                        })
                        this.questions = questions
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        },
    },

    computed: {
        questionnaireId() {
            return this.$store.getters.CURRENT_QUESTIONNAIRE_ID
        },
        bttnText() {
            return (this.questionnaireId ? 'Update' : 'Create')
        },
    },

    components: {
        CompactQuestionList,
    },

    created() {
        this.getQuestions()
        bus.$on('haveQuestionnaireId', this.getQuestionnaireById);
        bus.$on('questionsUpdate', this.getQuestions)
    }
}
</script>

<style scoped>
h2 {
    margin: 24px;
}

h3 {
    font-family: 'Comfortaa', cursive;
    margin: 4px 0;
}

.questionnaire-form {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 960px;
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

.headers {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

label {
    margin: 0 4px 0 16px;
}

input[type=text] {
    margin-top: 8px;
    border: solid 1px rgba(0, 0, 0, 0.3);
}

input[type=text]:focus {
    outline: none;
    border: solid 1px rgb(31, 137, 229);
}

input[type=submit] {
    margin: 20px;
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


input[type=submit]:focus {
    outline: none;
}
</style>
