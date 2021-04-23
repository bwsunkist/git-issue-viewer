import * as fs from 'fs'
const config = require('../config')

const pjArray: Array<string> = config.PROJ_ID
const tagArray: Array<string> = config.COUNT_TAGS

type resultJsonFormat = {
  openAll?: {}
  closeAll?: {}
  openAllCumulate?: {}
  closeAllCumulate?: {}
  allChart?: {
    labels: {}
    datasets: any
  }
  allChartCumulate?: {
    labels: {}
    datasets: any
  }
}

const result: resultJsonFormat = {}

const allDateOpenIssues = {}
const allDateCloseIssues = {}

pjArray.forEach((pjId) => {
  tagArray.forEach((tag) => {
    try {
      const repoName = `${pjId}_${tag}.json`
      const csvData = fs.readFileSync(
        `${__dirname}/../output/${repoName}`,
        'utf-8'
      )
      const data = JSON.parse(csvData)
      const eachDateOpenIssues = {}
      const eachDateCloseIssues = {}
      data.issuesArr.forEach((issue) => {
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
      })
      result[`open_${tag}`] = eachDateOpenIssues
      result[`close_${tag}`] = eachDateCloseIssues
    } catch (error) {
      console.log(error)
    }
  })
})

result.openAll = allDateOpenIssues
result.closeAll = allDateCloseIssues

// 片方にだけ存在する日付がないように０埋め
if (Object.keys(result.openAll) !== Object.keys(result.closeAll)) {
  const openKeys = Object.keys(result.openAll)
  const closeKeys = Object.keys(result.closeAll)
  openKeys.forEach((key) => {
    if (!result.closeAll[key]) {
      result.closeAll[key] = 0
    }
  })
  closeKeys.forEach((key) => {
    if (!result.openAll[key]) {
      result.openAll[key] = 0
    }
  })
}
// キーの日付でソート
const openAllSorted = objectSortByKey(result.openAll)
const closeAllSorted = objectSortByKey(result.closeAll)

const openKeys = Object.keys(openAllSorted)
const closeKeys = Object.keys(closeAllSorted)

// 累積のカウントも計算
const openAllCumulate = {}
let current = 0
openKeys.forEach((key) => {
  current += openAllSorted[key]
  openAllCumulate[key] = current
}, 0)
const closeAllCumulate = {}
current = 0
closeKeys.forEach((key) => {
  current += closeAllSorted[key]
  closeAllCumulate[key] = current
}, 0)
result.openAllCumulate = openAllCumulate
result.closeAllCumulate = closeAllCumulate

// 作図用パラメータ準備
result.allChart = {
  labels: openKeys,
  datasets: [
    {
      label: 'open',
      lineTension: 0,
      borderColor: '#f87979',
      fill: false,
      data: [],
    },
    {
      label: 'closed',
      lineTension: 0,
      borderColor: '#0067c0',
      fill: false,
      data: [],
    },
  ],
}
openKeys.forEach((key) => {
  ;(result.allChart.datasets[0].data as Array<number>).push(result.openAll[key])
})
closeKeys.forEach((key) => {
  ;(result.allChart.datasets[1].data as Array<number>).push(
    result.closeAll[key]
  )
})

result.allChartCumulate = {
  labels: openKeys,
  datasets: [
    {
      label: 'open',
      lineTension: 0,
      borderColor: '#f87979',
      fill: false,
      data: [],
    },
    {
      label: 'closed',
      lineTension: 0,
      borderColor: '#0067c0',
      fill: false,
      data: [],
    },
  ],
}
openKeys.forEach((key) => {
  ;(result.allChartCumulate.datasets[0].data as Array<number>).push(
    result.openAllCumulate[key]
  )
})
closeKeys.forEach((key) => {
  ;(result.allChartCumulate.datasets[1].data as Array<number>).push(
    result.closeAllCumulate[key]
  )
})

const resultJson = JSON.stringify(result)
fs.writeFileSync(`${__dirname}/../output/result.json`, resultJson)

function objectSortByKey(object: any) {
  const sorted = {}
  const keyArray = Object.keys(object)
  keyArray.sort()

  keyArray.forEach((key) => {
    sorted[key] = object[key]
  })

  return sorted
}
