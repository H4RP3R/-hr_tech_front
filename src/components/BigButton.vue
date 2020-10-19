<template>
    <button v-on:click="bttnFunction" type="button" name="button">{{ bttnText }}</button>
</template>

<script>
export default {
    name: 'big-button',

    props: ['bttnText', 'bttnFunction']
}
</script>

<style scoped>
</style>
