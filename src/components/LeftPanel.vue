<template>
<div class="panel">
    <h2>Hi, {{ userData.username }}</h2>
    <big-button bttnText="add question" :bttnFunction="addNewQuestion" /><br>
    <big-button bttnText="add questionnaire" :bttnFunction="addNewQuestionnaire" />
</div>
</template>

<script>
import BigButton from '@/components/BigButton.vue'

export default {
    name: 'left-panel',

    data() {
        return {

        }
    },

    methods: {
        addNewQuestion: function() {
            document.querySelector('.page-wrapper').classList.add('blur')
            document.querySelector('.qestion-form').style.display = 'block'
        },
        addNewQuestionnaire: function() {
            document.querySelector('.page-wrapper').classList.add('blur')
            document.querySelector('.questionnaire-form').style.display = 'block'
        },
    },

    computed: {
        userData() {
            return this.$store.getters.USER_DATA
        }
    },

    components: {
        BigButton,
    }
}
</script>

<style scoped>
h2 {
    color: rgba(85, 76, 185, 0.9);
    text-decoration: underline;
}

.panel {
    width: 30%;
    border-right: solid 1px rgb(0, 0, 0, 0.1);
    margin-right: 8px;
    padding-right: 8px;
}
</style>
