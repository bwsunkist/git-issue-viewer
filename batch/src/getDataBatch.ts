import * as fs from 'fs'
import axios, { AxiosRequestConfig } from 'axios'
const config = require('../config')

const axiosInst = axios.create({
  baseURL: config.GITLAB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'PRIVATE-TOKEN': config.ACCESS_TOKEN,
  },
  responseType: 'json',
})

const pjArray: Array<string> = config.PROJ_ID
const tagArray: Array<string> = config.COUNT_TAGS

pjArray.forEach((pjId) => {
  tagArray.forEach((tag) => {
    const axiosConf: AxiosRequestConfig = {
      params: {
        labels: tag,
        per_page: 50,
        scope: 'all',
      },
    }
    axiosInst
      .get(`/${pjId}/issues`, axiosConf)
      .then(function (response) {
        const issuesArr: Array<any> = response.data
        // issuesArr.forEach((issue) => {
        //   const res = {
        //     created_at: issue.created_at,
        //     labels: issue.labels[0],
        //     state: issue.state,
        //   }
        // })
        const result = { issuesArr }
        const resultJson = JSON.stringify(result)
        const repoName = `${pjId}_${tag}.json`
        fs.writeFileSync(`${__dirname}/../output/${repoName}`, resultJson)
      })
      .catch(function (error) {
        console.log(error)
      })
  })
})
