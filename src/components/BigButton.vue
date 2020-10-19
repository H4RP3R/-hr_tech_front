<template>
<button v-on:click="bttnFunction" type="button" name="button" class="big-button">{{ bttnText }}</button>
</template>

<script>
export default {
    name: 'big-button',

    props: ['bttnText', 'bttnFunction']
}
</script>

<style scoped>
.big-button {
    text-transform: uppercase;
    border: solid 1px rgb(76, 185, 117);
    background-color: white;
    color: rgb(76, 185, 117);
    font-family: 'Comfortaa', cursive;
    font-weight: bold;
    padding: 4px 10px;
    margin: 2px;
    transition: 1s;
}

.big-button:focus {
    outline: solid 1px rgba(76, 185, 117, 0.7);
}

.big-button:hover {
    color: white;
    background-color: rgba(76, 185, 117, 0.7);
    transition: 1s;
}
</style>
