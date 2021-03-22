<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="small">
        <line-chart :chart-data="datacollection" :options="options"></line-chart>
        <button @click="fillData()">Randomize</button>
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
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Vue from 'vue';
import { sampleValue } from '../assets/assets';
import LineChart from '../plugins/LineChart'

export default Vue.extend({
  mounted () {
      this.fillData()
  },
  data() {
    return {
      title: 'aaaaa',
      selectedPjName: 'aaaaabbb',
      datacollection: {},
      options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day'
                }
            }]
        }
      }
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [ new Date("2015-3-15 13:3"), new Date("2015-3-19 13:3"), new Date("2015-3-21 13:3") ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [ this.getRandomInt(), 10, 60 ]
          },
          {
            label: 'Data two',
            backgroundColor: '#f82970',
            data: [ this.getRandomInt(), 20, 40 ]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }, 
  components: {
    Logo,
    VuetifyLogo,
    LineChart
  }
})
</script>
