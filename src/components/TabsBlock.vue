<template>
<div class="tabs">
    <div class="tab">
        Questions
    </div>
    <div class="tab">
        Questionnaires
    </div>
</div>
</template>

<script>
export default {
    name: 'tabs-block'
}
</script>

<style scoped>
.tabs {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
}

.tab {
    padding: 8px;
    width: 50%;
    font-family: 'Comfortaa', cursive;
}

.tab:hover {
    -webkit-box-shadow: 2px 4px 10px -4px rgba(0, 0, 0, 0.32);
    -moz-box-shadow: 2px 4px 10px -4px rgba(0, 0, 0, 0.32);
    box-shadow: 2px 4px 10px -4px rgba(0, 0, 0, 0.32);
}
</style>
