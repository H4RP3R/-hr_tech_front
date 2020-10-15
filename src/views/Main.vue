<template>
<div class="">

</div>
</template>

<script>
export default {
    name: 'Main',

    methods: {
        getCookieValue: function(a) {
            const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)')
            return b ? b.pop() : ''
        }
    },

    created() {
        const token = this.getCookieValue('token')
        if (!token) {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>

<style scoped>

</style>
