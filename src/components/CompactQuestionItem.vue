<template>
<div class="item box-shadow">
    <div class="item-header">
        <span>id:</span> {{ question.id }}
    </div>
    <div class="inner-html" v-html="question.text"></div>
</div>
</template>

<script>
export default {
    name: 'compact-question-item',

    props: ['question'],
}
</script>

<style scoped>
.item {
    border: solid 1px rgba(0, 0, 0, 0.3);
    margin-bottom: 4px;
}

.item-header {
    border-bottom: solid 1px rgba(0, 0, 0, 0.3);
    font-family: 'Comfortaa', cursive;
    font-size: 10px;
    color: white;
    background: rgb(76, 185, 117);
    background: linear-gradient(90deg, rgba(76, 185, 117, 0.3) 0%, rgba(85, 76, 185, 0.5) 35%, rgba(0, 212, 255, 0.3) 100%);
    padding: 1px;
    padding-top: 2px;
}

.inner-html {
    max-height: 60px;
    overflow: hidden;
    font-size: 10px;
    overflow-x: auto;
    overflow-y: auto;
    text-align: left;
    margin-left: 10px;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}
</style>
