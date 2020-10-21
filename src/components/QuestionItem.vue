<template>
<div class="question-item box-shadow tooltip" @click="$emit('clickOn', question.id)">
    <div class="arrow-up"></div>
    <span class="tooltiptext">Click to edit</span>
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
    position: relative;
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

.tooltip .tooltiptext {
    visibility: hidden;
    position: absolute;
    bottom: 2px;
    right: 2px;
    background-color: rgba(85, 76, 185, 0.1);
    color: white;
    padding: 8px;
    z-index: 5;
}

.arrow-up {
    visibility: hidden;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 5px solid rgba(85, 76, 185, 0.1);

    position: absolute;
    bottom: 37px;
    right: 70px;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    background-color: rgba(85, 76, 185, 0.8);
    transition: background-color 1s;
}

.tooltip:hover .arrow-up {
    visibility: visible;
    border-bottom: 5px solid rgba(85, 76, 185, 0.9);
    transition: 1s;
}
</style>
