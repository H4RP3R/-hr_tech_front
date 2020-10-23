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
    color: rgba(0, 0, 0, 0.7);
    font-family: 'Comfortaa', cursive;
    font-weight: bold;
    padding: 6px 10px;
    margin: 6px 2px 0 0;
    transition: 0.7s;
    width: 180px;
}

.big-button:focus {
    outline: solid 1px rgba(76, 185, 117, 0.7);
}

.big-button:hover {
    color: white;
    background-color: rgba(76, 185, 117, 0.7);
    transition: 0.7s;
}
</style>
