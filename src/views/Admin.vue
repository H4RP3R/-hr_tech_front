<template>
<div class="wrapper">
    <left-panel />
</div>
</template>

<script>
import LeftPanel from '@/components/LeftPanel.vue'


export default {
    name: 'Main',

    methods: {
        getCookieValue: function(a) {
            const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)')
            return b ? b.pop() : ''
        }
    },

    components: {
        LeftPanel,
    },

    props: ['userData'],

    created() {
        const token = this.getCookieValue('token')
        if (!token) {
            this.$router.push({ name: 'Login' })
        }
    }

}
</script>

<style scoped>
.wrapper {
    background-color: blue;
    width: 1140px;
    display: flex;
    flex-direction: row;
}
</style>
