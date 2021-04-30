import axios from 'axios'
const config = require('../config')

export const axiosInst = axios.create({
  baseURL: config.GITLAB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'PRIVATE-TOKEN': config.ACCESS_TOKEN,
  },
  responseType: 'json',
})
