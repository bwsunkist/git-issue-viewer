import axios from 'axios';
import * as fs from 'fs';
const config = require('../config')

const axiosInst = axios.create({ 
    baseURL: config.GITLAB_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'PRIVATE-TOKEN': config.ACCESS_TOKEN
    },
    responseType: 'json'
}) 

const result = {}
const tagArray: Array<string> = config.COUNT_TAGS;

tagArray.forEach(tag => {
  axiosInst.get(`/${config.PROJ_ID}/issues?labels=${tag}&per_page=50&scope=all`)
  .then(function (response) {
    console.log('---', tag, '---')
    const issuesArr: Array<any> = response.data;
    // console.log(issuesArr.length)
    issuesArr.forEach(issue => {
      const res = {
        created_at: issue.created_at,
        labels: issue.labels[0],
        state: issue.state
      }
      console.log(res);      
    });
  })
  .catch(function (error) {
    console.log(error);
  })
});


// const datesample = new Date('2021-01-16T14:47:22.393Z')
// console.log(datesample.getFullYear())
// console.log(datesample.getMonth() + 1)
// console.log(datesample.getDate())
// const date = new Date(datesample.getFullYear(), datesample.getMonth(), datesample.getDate())
// console.log(date.toDateString())
// const b = date.toDateString();
// const a = []
// a.push({ [b]: 1 })
// console.log(a)
