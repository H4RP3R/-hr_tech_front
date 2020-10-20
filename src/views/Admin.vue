<template>
<div class="wrapper">
    <left-panel />
    <div class="panel">
        <tabs-block />
        <question-list />
    </div>
</div>
</template>

<script>
import LeftPanel from '@/components/LeftPanel.vue'
import QuestionList from '@/components/QuestionList.vue'
import TabsBlock from '@/components/TabsBlock.vue'

export default {
    name: 'Main',

    methods: {},

    components: {
        LeftPanel,
        QuestionList,
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
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 8px;
}
</style>
