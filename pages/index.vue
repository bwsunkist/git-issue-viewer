<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="small">
        <horizontal-bar-chart
          :chart-data="barGraphCollecion"
          :options="options"
        ></horizontal-bar-chart>
        open issueを含むラベルを表示しています。
        <button @click="fillData()">Randomize</button>
      </div>
      <v-card>
        <v-card-title class="headline"> git-issue-viewer </v-card-title>
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
import HorizontalBarChart from '../plugins/HorizontalBarChart'
import { gitlabStore } from '~/store'

export default Vue.extend({
  components: {
    HorizontalBarChart,
  },
  async asyncData() {
    try {
      await gitlabStore.fetchLabelList(4)
      const barData = gitlabStore.getLabelData

      const barGraphCollecion = {
        labels: barData.labels,
        datasets: [
          {
            label: 'open',
            lineTension: 0,
            backgroundColor: '#f87979',
            data: barData.open,
          },
          // {
          //   label: 'close',
          //   type: 'line',
          //   lineTension: 0,
          //   backgroundColor: '#0067c0',
          //   data: barData.close,
          // },
        ],
      }
      return { barGraphCollecion }
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      title: 'aaaaa',
      selectedPjName: 'aaaaabbb',
      barGraphCollecion: {},
      options: {
        indexAxis: 'y',
        // scales: {
        //   xAxes: [
        //     {
        //       stacked: true,
        //     },
        //   ],
        //   yAxes: [
        //     {
        //       stacked: true,
        //     },
        //   ],
        // },
      },
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: 'Data two',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
  },
})
</script>
