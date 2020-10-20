<template>
<div class="question-item box-shadow">
    <div class="item-header">
        <b>id:</b> {{ question.id }}
    </div>
    <div class="inner-html" v-html="question.text"></div>
</div>
</template>

<script>
export default {
    name: 'question-item',

    props: ['question'],
}
</script>

<style scoped>
.question-item {
    border: solid 1px rgba(0, 0, 0, 0.3);
    margin: 10px 4px;
}

.item-header {
    border-bottom: solid 1px rgba(0, 0, 0, 0.3);
    font-family: 'Comfortaa', cursive;
    font-size: 12px;
    color: white;
    background-color: rgba(76, 185, 117, 0.7);
    padding: 1px;
    padding-top: 2px;
}

.inner-html {
    padding: 4px 22px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    text-align: left;
}
</style>
