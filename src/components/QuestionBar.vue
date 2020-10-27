<bar-chart :chartdata="chartData" :options="chartOptions"/>

<script>
import { Bar } from 'vue-chartjs'

export default {
    name: 'question-bar',
    extends: Bar,

    props: ['chartData'],

    mounted() {
        this.renderChart(this.chartdata, this.options)
    },

    data() {
        return {
            chartdata: {
                labels: [
                    this.chartData.question.answer1,
                    this.chartData.question.answer2,
                    this.chartData.question.answer3,
                    this.chartData.question.answer4,
                    'Correct',
                    'Total replies',
                ],
                datasets: [{
                    label: `Question id: ${this.chartData.question.id}`,
                    backgroundColor: ['#D98880', '#C39BD3', '#7FB3D5', '#76D7C4', '#F7DC6F', '#808B96'],
                    data: [
                        this.chartData.var_1_repl,
                        this.chartData.var_2_repl,
                        this.chartData.var_3_repl,
                        this.chartData.var_4_repl,
                        this.chartData.correct,
                        this.chartData.total_replies,
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
}
</script>

<style scoped>

</style>
