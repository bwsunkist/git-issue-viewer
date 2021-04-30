<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <v-sheet min-height="70vh" rounded="lg">
          <label-bar-chart :data="barGraphCollecion"> </label-bar-chart>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="4">
        <v-sheet rounded="lg" min-height="30" class="grey lighten-3">
          <v-card style="position: fixed">
            <v-card-title class="headline"> {{ title }} </v-card-title>
            <v-card-text>
              <p v-if="title === initialTitle">
                Click bar in glaph, then detailed data of the label will be
                indicated here.
              </p>
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
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import LabelBarChart from '../components/LabelBarChart.vue'
import { gitlabStore } from '~/store'

export default Vue.extend({
  components: {
    LabelBarChart,
  },
  async asyncData() {
    try {
      await gitlabStore.readLabelList()
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
      initialTitle: 'git-issue-viewer',
      title: 'git-issue-viewer',
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
    async readLabalData() {
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
          ],
        }
        return { barGraphCollecion }
      } catch (e) {
        console.log(e)
      }
    },
  },
})
</script>
