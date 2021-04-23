/* eslint-disable import/no-mutable-exports */
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosInstance } from 'axios'
import * as config from '../batch/config.json'

let $axios: NuxtAxiosInstance
let axiosGitlab: AxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}
export { $axios }

// for store logic
export function getAxiosForGitlab() {
  axiosGitlab = $axios.create({
    baseURL: config.GITLAB_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'PRIVATE-TOKEN': config.ACCESS_TOKEN,
    },
    responseType: 'json',
  })
}

export { axiosGitlab }
