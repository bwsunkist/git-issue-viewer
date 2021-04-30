<template>
  <div class="small">
    <v-btn class="ma-2" color="secondary"> Fetch Latest Data </v-btn>
    <v-btn class="ma-2" color="secondary" @click="changeDense">
      change height
    </v-btn>
    <horizontal-bar-chart
      :chart-data="data"
      :options="options"
      :height="height"
      :width="width"
      :styles="style"
    ></horizontal-bar-chart>
  </div>
</template>

<script>
import HorizontalBarChart from '../plugins/HorizontalBarChart'

export default {
  components: {
    HorizontalBarChart,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      width: window.innerWidth,
      height: 15000,
      heightBase: 25,
      options: {
        indexAxis: 'y',
        scaleShowValues: true,
        responsive: true,
        maintainAspectRatio: false,
        xAxes: [
          {
            ticks: {
              autoSkip: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              autoSkip: false,
              stepSize: 1,
            },
          },
        ],
      },
    }
  },
  computed: {
    labelsNum() {
      const labels = this.data.labels
      return labels.length * this.heightBase
    },
    style() {
      const labels = this.data.labels
      const calcHeight = labels.length * this.heightBase
      return {
        height: `${calcHeight}px`,
        width: this.width,
        position: 'relative',
      }
    },
  },
  methods: {
    changeDense() {
      this.heightBase = this.heightBase === 25 ? 5 : 25
    },
  },
}
</script>
