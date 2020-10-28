<template>
<div class="variants" ref="var">
    <div class="var">
        <span>1. {{ vars.answer1 }}</span>
    </div>
    <div class="var">
        <span>2. {{ vars.answer2 }}</span>
    </div>
    <div class="var">
        <span>3. {{ vars.answer3 }}</span>
    </div>
    <div class="var">
        <span>4. {{ vars.answer4 }}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'variants-billet',

    props: ['vars', 'correctAnsNum', 'userAnswers'],

    methods: {
        markSelected: function() {
            // console.log(this.userAnswers);
            const variants = this.$refs.var.getElementsByClassName('var')

            if (this.userAnswers === undefined) {
                return
            }

            this.userAnswers.forEach(i => {
                variants[i - 1].classList.add('checked')
            })

            this.userAnswers.forEach(i => {
                if (this.correctAnsNum.split(',').map(x => +x).includes(i)) {
                    variants[i - 1].classList.add('correct')
                } else {
                    variants[i - 1].classList.add('wrong')
                }
            })
        }
    },

    mounted() {
        this.$nextTick(this.markSelected)
    },
}
</script>

<style scoped>
.variants {
    color: white;
    background-color: rgba(76, 185, 117, 0.7);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 6px;
    padding: 8px;
    margin: 12px 0;
}

.var {
    margin-left: 10px;
}

.checked {
    font-weight: bold;
    font-style: italic;
}

.correct::after {
    content: '✔';
    color: green;
    margin-left: 5px;
    font-size: 20px;
}

.wrong::after {
    content: '✘';
    color: red;
    margin-left: 5px;
    font-size: 20px;
}
</style>
