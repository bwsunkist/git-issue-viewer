import axios from 'axios';
import * as fs from 'fs';
const config = require('../config')

const axiosInst = axios.create({ 
   baseURL: `${config.BASE_URL}/repos/${config.REPO_URL[0]}`,
   headers: { 'Content-Type': 'application/json' }, 
   responseType: 'json'
}) 

axiosInst.get('/pulls?state=open')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
})

