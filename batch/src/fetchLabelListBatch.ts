import * as fs from 'fs'
import { fetchLabelListForAllPj } from './fetchLabelList'

/**
 * labelsデータを取得しJSONファイルに保存する.
 */
function main() {
  fetchLabelListForAllPj().then((allLabelsResult) => {
    const pjIdArray = Object.keys(allLabelsResult)
    pjIdArray.forEach((pjId) => {
      const repoName = `${pjId}_labels.json`
      const resultJson = JSON.stringify(allLabelsResult[pjId])

      fs.writeFileSync(`${__dirname}/../output/${repoName}`, resultJson)
    })
  })
}

main()
