<template>
<div class="right-panel">
    <div v-for="stat in stats" :key=stat.id class="">
        <h2>{{ stat.questionnaire.title }}</h2>
        <div v-for="q in stat.questionnaire.questions" :key="q.id" class="question-item">
            <span v-html="q.text" class="question-text"></span>

            <div class="variants">
                <variants-billet :vars="q" :correctAnsNum="q.correct_answers" :userAnswers="stat.answers[q.id]" />
                {{ stat.user.username }}
            </div>
            <hr>
        </div>
    </div>
</div>
</template>

<script>
import VariantsBillet from '@/components/VariantsBillet.vue'

export default {
    name: 'user-stats-panel',

    props: ['stats'],

    components: {
        VariantsBillet,
    }
}
</script>

<style scoped>
h1 {
    margin: 8px;
}

hr {
    margin: 28px;
}

.right-panel {
    width: 70%;
}

.question-text {
    font-size: 14px;
    align-self: flex-start;
}

.question-item {
    border: solid 1px rgba(0, 0, 0, 0.2);
    padding: 14px;
    margin: 4px;
}
</style>
