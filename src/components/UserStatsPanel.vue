<template>
<div class="right-panel">
    <div v-if="stats.length === 0" class="no-data">
        <span>no data</span>
    </div>
    <div v-for="stat in stats" :key="stat.id">
        <h2>{{ stat.questionnaire.title }}</h2>
        <div v-for="q in stat.questionnaire.questions" :key="q.id" class="question-item box-shadow">
            <span v-html="q.text" class="question-text"></span>

            <div class="variants">
                <variants-billet :question="q" :correctAnsNum="q.correct_answers" :userAnswers="stat.answers[q.id]" />
            </div>

        </div>
        <div class="user-score box-shadow">
            <span v-if="stat.user.username== $store.getters.USER_DATA.username">
                <p><b>Your</b> score: {{ stat.score }}</p>
            </span>
            <span v-else>
                <p><b>{{ stat.user.username }}</b>'s score: {{ stat.score }}</p>
            </span>
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
    margin: 8px 4px;
}

.user-score {
    font-size: 22px;
    margin: 12px;
    padding: 20px;
}
</style>
