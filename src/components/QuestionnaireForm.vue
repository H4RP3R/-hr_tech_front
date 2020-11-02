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
        <div class="fields">

            <div class="field">
                <label for="title">Title</label>
                <input v-model="title" type="text" name="title" id="title" value="">
            </div>

            <div class="field">
                <label for="pub-time">When to publish</label>
                <input v-model="pubDate" type="datetime-local" name="pub-time" :min="minTime">
            </div>

            <div class="bttn-field">
                <input class="submit-bttn" type="submit" name="submit" :value="bttnText">
                <span v-if="bttnText=='Update'">
                    <button @click="deleteQuestionnaire" type="button" class="delete-bttn" name="delete">Delete</button>
                </span>
            </div>
        </div>

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


const BASE_URL = 'http://localhost:8000/api/'

export default {
    name: 'questionnaire-form',

    data() {
        return {
            title: '',
            questions: [],
            includedQuestions: [],
            pubDate: null,
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
                    'questions': this.$store.getters.INCLUDED_QUESTIONS.map(q => q.id),
                    'pub_date': new Date(new Date(this.pubDate).toString())
                },
                'headers': headers
            }).then(() => {
                this.title = ''
                this.pubDate = null,
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
                    this.$store.commit('SET_INCLUDED_QUESTIONS', response.data.questions)

                    const d = new Date(response.data.pub_date)
                    const year = d.getFullYear()
                    const month = ('0' + (d.getMonth() + 1)).slice(-2)
                    const date = ('0' + (d.getDate())).slice(-2)
                    const hour = ('0' + (d.getHours())).slice(-2)
                    const min = ('0' + (d.getMinutes())).slice(-2)
                    this.pubDate = `${year}-${month}-${date}T${hour}:${min}`
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
                    if (this.includedQuestions == 0) {
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

        deleteQuestionnaire() {
            const headers = {
                Authorization: `Token ${this.token = this.$cookies.get('token')}`
            }

            axios({
                method: 'delete',
                url: BASE_URL + 'questionnaire/' + this.questionnaireId,
                'headers': headers
            }).then(() => {
                this.closeForm()
                bus.$emit('questionnaireUpdate')
                this.$store.commit('SET_CURRENT_QUESTIONNAIRE_ID', null)
            }).catch((err) => {
                console.error(err)
            })
        }
    },

    computed: {
        questionnaireId() {
            return this.$store.getters.CURRENT_QUESTIONNAIRE_ID
        },
        bttnText() {
            return (this.questionnaireId ? 'Update' : 'Create')
        },
        minTime() {
            const d = new Date()
            return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}`
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

input[type=text],
input[type=datetime-local] {
    margin-top: 8px;
    border: solid 1px rgba(0, 0, 0, 0.3);
    padding: 4px;
}

input[type=datetime-local] {
    padding: 2px;
}

input[type=text]:focus,
input[type=datetime-local]:focus {
    outline: none;
    border: solid 1px rgb(31, 137, 229);
}

input[type=submit] {
    margin: 20px;
    border: solid 1px rgb(85, 76, 185);
    padding: 0 2px;
    background-color: white;
    transition: 1s;
    padding: 4px 0;
    width: 120px;
    align-self: center;
}

input[type=submit]:hover {
    color: white;
    background-color: rgb(85, 76, 185);
    transition: 1s;
}


input[type=submit]:focus {
    outline: none;
}

.fields {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.field {
    display: flex;
    flex-direction: column;
    width: 240px;
    margin: 4px 0;
}

.bttn-field {
    flex-direction: row;
    justify-content: space-around;
}

.delete-bttn {
    margin: 20px;
    border: solid 1px red;
    padding: 0 2px;
    background-color: white;
    transition: 1s;
    padding: 4px 0;
    width: 120px;
    align-self: center;
    color: red;
}

.delete-bttn:hover {
    background-color: red;
    color: white;
    transition: 1s;
}
</style>
