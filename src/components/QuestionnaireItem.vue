<template>
<div class="item  box-shadow tooltip" @click="$emit('clickOnQuestionnaire', questionnaire.id)">
    <div class="arrow-up"></div>
    <span class="tooltiptext">Click to edit</span>
    <div>
        <span>id: </span>{{ questionnaire.id }}
    </div>
    <div>
        <span>title: </span>{{ questionnaire.title }}
    </div>
    <div>
        <span>contains {{ questionnaire.questions.length }} </span>
        <span v-if="questionsNum == 1">
            question
        </span>
        <span v-else>questions</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'questionnaire-item',

    props: ['questionnaire'],

    computed: {
        questionsNum: function() {
            let n = 0
            this.questionnaire.questions.forEach((item) => {
                if (item) {
                    n++
                }
            })
            return n
        }
    }
}
</script>

<style scoped>
.item {
    border: solid 1px rgba(0, 0, 0, 0.3);
    margin: 10px 4px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
    color: white;
    background: rgb(76, 185, 117);
    background: linear-gradient(90deg, rgba(76, 185, 117, 0.3) 0%, rgba(85, 76, 185, 0.5) 35%, rgba(0, 212, 255, 0.3) 100%);
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
