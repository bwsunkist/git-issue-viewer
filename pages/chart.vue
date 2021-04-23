<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="issue-line-chart">
        <line-chart
          :chart-data="datacollection"
          :options="options"
        ></line-chart>
      </div>
      <div class="small">
        <line-chart
          :chart-data="datacollection2"
          :options="options"
        ></line-chart>
      </div>
      <v-card>
        <v-card-title class="headline">
          {{ selectedPjName }}
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import LineChart from '../plugins/LineChart'
import * as result from '../batch/output/result.json'

export default Vue.extend({
  components: {
    LineChart,
  },
  data() {
    return {
      title: 'aaaaa',
      selectedPjName: 'aaaaabbb',
      datacollection: {},
      datacollection2: {},
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                stepSize: 1.0,
              },
            },
          ],
        },
      },
      options2: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 50,
                suggestedMax: 100,
              },
            },
          ],
        },
      },
    }
  },
  mounted() {
    this.fillData()
    this.fillData2()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['2015-03-15', '2015-03-17', '2015-03-20'],
        datasets: [
          {
            label: 'Data One',
            lineTension: 0,
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), 10, 40],
          },
          {
            label: 'Data two',
            lineTension: 0,
            backgroundColor: '#f82970',
            data: [this.getRandomInt(), 20, 60],
          },
        ],
      }
      this.datacollection2 = {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20],
          },
        ],
      }
    },
    fillData2() {
      const data = (result as any).allChart
      this.datacollection = data
      const data2 = (result as any).allChartCumulate
      this.datacollection2 = data2
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
  },
})
</script>

<style>
.issue-line-chart {
}
</style>
