
<template lang="">
    <div>
        <apexchart height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<script>
import apexchart from 'apexcharts';
import VueApexCharts from 'vue3-apexcharts';
export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    comparacion1: {
      type: Object,
      required: true
    },
    comparacion2: {
      type: Object,
      required: true
    },
    comparacion3: {
      type: Object,
      required: true
    },
    comparacion4: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      series: [
        {
        name:"seriaA",
        data: this.comparacion1.map((item,index)=>{
          return{
            x: item,
            y: this.comparacion2[index]
          }
        })
      },
      {
        name:"serieB",
        data:this.comparacion3.map((item,index)=>{
          return{
            x: item,
            y: this.comparacion4[index]
          }
        })
      }
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
        labels: [1,2,3,4,5,6,7,8,9,10,11,12],
        title: {
          text: "Grafico"
        },
        xaxis: {
        },
      },
    }
  },
  beforeMount(){

  }
}
</script>
<style lang="">

</style>