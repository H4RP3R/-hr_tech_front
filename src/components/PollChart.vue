<template>
<div class="wrapper">
    <div v-for="d in dataList" :key="d.id" class="chart-item">
        <span v-html="d.question.text" class="question-text"></span>
        <question-bar :chartData="d" />
    </div>
</div>
</template>

<script>
import QuestionBar from '@/components/QuestionBar.vue'

export default {
    name: 'poll-chart',

    props: ['dataList', ],

    components: {
        QuestionBar,
    },
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-grow:3;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
}

.question-text {
    font-size: 14px;
    align-self: flex-start;
}

.chart-item {
    width: 49%;
    margin-top: 12px;
}
</style>
