<template>
<div>
    <div class="variants" ref="var">
        <div class="var">
            <span>1. {{ question.answer1 }}</span>
        </div>
        <div class="var">
            <span>2. {{ question.answer2 }}</span>
        </div>
        <div class="var">
            <span>3. {{ question.answer3 }}</span>
        </div>
        <div class="var">
            <span>4. {{ question.answer4 }}</span>
        </div>
    </div>
    <div class="the-same">
        <span class="percent">{{ this.sameAnswerPercent }} %</span>
        <span> of users have chosen the same variant.</span>
    </div>
</div>
</template>

<script>
import axios from 'axios'

const URL = 'http://localhost:8000/question_stats/'

export default {
    name: 'variants-billet',

    props: ['question', 'correctAnsNum', 'userAnswers'],

    data() {
        return {
            crowdStats: {},
            sameAnswerPercent: 0,
        }
    },

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
        },

        getQestionStats: function() {
            const config = {
                headers: {
                    Authorization: `Token ${this.$cookies.get('token')}`
                }
            }

            axios.get(URL + this.question.id, config)
                .then(response => {
                    this.crowdStats = response.data
                    this.calcPercentage()
                }).catch(err => {
                    console.error(err);
                })
        },

        calcPercentage: function() {
            let n = 0
            this.userAnswers.forEach(item => {
                n += this.crowdStats[`var_${item}_repl`]
            })
            const res = (n * 100 / this.crowdStats.total_replies)
            this.sameAnswerPercent = Number.parseFloat(res).toFixed(1)
        }
    },

    mounted() {
        this.$nextTick(this.markSelected)
        this.getQestionStats()
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

.the-same {
    font-style: italic;
}

.percent {
    font-weight: bold;
}
</style>
