import Vue from 'vue'
import Vuex from 'vuex'
import { bus } from '../main'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userData: {},
        questionToEdit: null,
        includedQuestions: [],
    },
    getters: {
        USER_DATA: state => {
            return state.userData
        },
        CURRENT_QUESTION_ID: state => {
            return state.questionToEdit
        },
        INCLUDED_QUESTIONS: state => {
            return state.includedQuestions
        }
    },
    mutations: {
        SET_USER_DATA: (state, payload) => {
            state.userData = payload
        },
        SET_CURRENT_QUESTION_ID: (state, payload) => {
            state.questionToEdit = payload
            if (state.questionToEdit) {
                bus.$emit('haveId')
            }
        },
        SET_INCLUDED_QUESTIONS: (state, payload) => {
            state.includedQuestions = payload
        }
    },
})
