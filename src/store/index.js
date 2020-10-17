import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userData: {},
    },
    getters: {
        USER_DATA: state => {
            return state.userData
        }
    },
    mutations: {
        SET_USER_DATA: (state, payload) => {
            state.userData = payload
        }
    },
})
