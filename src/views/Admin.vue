<template>
<div class="wrapper">
    <left-panel />
    <div class="right-panel">
        <tabs-block v-on:questionsClick="activateLeftTab" v-on:questionnairesClick="activateRightTab" />
        <question-list />
        <questionnaire-list />
    </div>
</div>
</template>

<script>
import LeftPanel from '@/components/LeftPanel.vue'
import QuestionList from '@/components/QuestionList.vue'
import QuestionnaireList from '@/components/QuestionnaireList.vue'
import TabsBlock from '@/components/TabsBlock.vue'

export default {
    name: 'Main',

    methods: {
        activateLeftTab: function() {
            document.querySelector('.questions').style.display = 'block'
            document.querySelector('.questionnaires').style.display = 'none'
        },

        activateRightTab: function() {
            document.querySelector('.questions').style.display = 'none'
            document.querySelector('.questionnaires').style.display = 'block'
        }
    },

    components: {
        LeftPanel,
        QuestionList,
        QuestionnaireList,
        TabsBlock,
    },

    props: ['userData'],

    created() {
        const token = this.token = this.$cookies.get('token')
        if (!token) {
            this.$router.push({ name: 'Login' })
            this.$store.commit('SET_USER_DATA', null)
        }
    }

}
</script>

<style scoped>
.right-panel {
    width: 70%;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 8px;
}
</style>
