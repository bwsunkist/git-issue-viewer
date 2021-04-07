import * as fs from 'fs'
const config = require('../config')

const pjArray: Array<string> = config.PROJ_ID;
const tagArray: Array<string> = config.COUNT_TAGS;

const result = {}

const allDateOpenIssues = {}
const allDateCloseIssues = {}

pjArray.forEach(pjId => {
  tagArray.forEach(tag => {
    try {
      const repoName = `${pjId}_${tag}.json`
      const csvData = fs.readFileSync(`${__dirname}/../output/${repoName}`, 'utf-8')
      const data = JSON.parse(csvData)
      console.log('tag:', tag)
      console.log('issuesNum:', data.issuesArr.length)

      let opendIssueCount = 0
      let closedIssueCount = 0
      const eachDateOpenIssues = {}
      const eachDateCloseIssues = {}
      data.issuesArr.forEach(issue => {
        const openDate = new Date(issue.created_at)
        if (eachDateOpenIssues[openDate.toISOString().slice(0, 10)]) {
          eachDateOpenIssues[openDate.toISOString().slice(0, 10)] += 1
        } else {
          eachDateOpenIssues[openDate.toISOString().slice(0, 10)] = 1
        }

        if (allDateOpenIssues[openDate.toISOString().slice(0, 10)]) {
          allDateOpenIssues[openDate.toISOString().slice(0, 10)] += 1
        } else {
          allDateOpenIssues[openDate.toISOString().slice(0, 10)] = 1
        }

        if (issue.closed_at !== null) {
          const closeDate = new Date(issue.closed_at)
          if (eachDateCloseIssues[closeDate.toISOString().slice(0, 10)]) {
            eachDateCloseIssues[closeDate.toISOString().slice(0, 10)] += 1
          } else {
            eachDateCloseIssues[closeDate.toISOString().slice(0, 10)] = 1
          }

          if (allDateCloseIssues[closeDate.toISOString().slice(0, 10)]) {
            allDateCloseIssues[closeDate.toISOString().slice(0, 10)] += 1
          } else {
            allDateCloseIssues[closeDate.toISOString().slice(0, 10)] = 1
          }
        }
      });
      // console.log('open',  eachDateOpenIssues)
      // console.log('close', eachDateCloseIssues)
      result[`open_${tag}`]   = eachDateOpenIssues
      result[`close_${tag}`] = eachDateCloseIssues
    } catch (error) {
      console.log('read csv file error');
      console.log(error);
    }
  });
});

// console.log('all open',  allDateOpenIssues)
// console.log('all close', allDateCloseIssues)
result[`open_all`]   = allDateOpenIssues
result[`close_all`] = allDateCloseIssues

// date closs check 本当はforeachの中で実施必要
if (Object.keys(result['open_all']) !== Object.keys(result['close_all'])) {
  const openKeys  = Object.keys(result['open_all'])
  const closeKeys = Object.keys(result['close_all'])
  openKeys.forEach(key => {
    if (!result['close_all'][key]) {
      result['close_all'][key] = 0
    }
  })
  closeKeys.forEach(key => {
    if (!result['open_all'][key]) {
      result['open_all'][key] = 0
    }
  })
}

// 作図用パラメータ準備
const openKeys  = Object.keys(result['open_all'])
const closeKeys = Object.keys(result['close_all'])
result['all_chart'] = {
  labels: openKeys,
  datasets: [
    {
      label: 'open',
      lineTension: 0,
      borderColor: '#f87979',
      fill: false,
      data: [  ]
    },
    {
      label: 'closed',
      lineTension: 0,
      borderColor: '#0067c0',
      fill: false,
      data: [  ]
    }
  ]
}
openKeys.forEach(key => {
  (result['all_chart']['datasets'][0].data as Array<number>).push(result['open_all'][key])
})
closeKeys.forEach(key => {
  (result['all_chart']['datasets'][1].data as Array<number>).push(result['close_all'][key])
})

// console.log('result',  result)
// console.log('result1',  result['all_chart']['datasets'][0])
// console.log('result2',  result['all_chart']['datasets'][1])
const resultJson = JSON.stringify(result)
fs.writeFileSync(`${__dirname}/../output/result.json`, resultJson)