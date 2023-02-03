

<template lang="">
    <div>
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts'
import apexchart from 'apexcharts';
export default {
    components: {
        apexchart: VueApexCharts
    },
    props: {
        comparacion1: {
            type: Array,
            required: true
        },
        comparacion2: {
            type: Array,
            required: true
        },
        dato: {
            type: String,
            required: true
        },
        moneda: {
            type: String,
            required: true,
            default() {
                return "USDM"
            }
        }
    },
    data() {
        return {
            series: [
                {
                    name: "proyectado",
                    data: this.comparacion1?.map((proyectado, index) => {
                        index = index + 1
                        return {
                            x: index + this.comparacion2.length,
                            y: proyectado.resultado_USDM
                        }
                    })
                },
                {
                    name: "real",
                    data: this.comparacion2?.map((real, index) => {
                        index = index + 1
                        return {
                            x: index,
                            y: real.resultado_USDM
                        }
                    })
                },
            ],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    animations: {
                        enabled: false
                    }
                },
                stroke: {
                    width: [5, 5, 4],
                    curve: 'straight'
                },
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
                title: {
                    text: this.dato
                },
                xaxis: {
                },
            },
        }
    },
}
</script>
<style scoped>
div {
    width: 60%;
}
</style>