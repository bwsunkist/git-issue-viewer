/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInst } from './batchSettings'
const config = require('../config')

// eslint-disable-next-line no-unused-vars
export async function fetchLabelListForAllPj(maxPage?: number) {
  const pjArray: Array<number> = config.PROJ_ID
  const allLabelsResult = {}
  await Promise.all(
    pjArray.map(async (pjId) => {
      let labelsResult = [] // LabelsResult も array で複数Pj分返さないとNG
      let tmpResult = []
      let pageNum = '1'
      while (tmpResult) {
        const getParam = {
          params: {
            with_counts: true,
            per_page: 50,
            page: pageNum,
          },
        }
        const result = await axiosInst.get(`/${pjId}/labels`, getParam)
        tmpResult = result.data
        labelsResult = labelsResult.concat(tmpResult)
        if (
          result.headers['x-next-page'] === '' ||
          result.headers['x-page'] === String(maxPage)
        ) {
          break
        }
        pageNum = result.headers['x-next-page']
      }
      allLabelsResult[pjId] = labelsResult
    })
  )
  return allLabelsResult
}

// eslint-disable-next-line no-unused-vars
export async function fetchLabelListForTargetPj(
  pjId: string,
  maxPage?: number
) {
  let labelsResult = []
  let tmpResult = []
  let pageNum = '1'
  while (tmpResult) {
    const getParam = {
      params: {
        with_counts: true,
        per_page: 50,
        page: pageNum,
      },
    }
    const result = await axiosInst.get(`/${pjId}/labels`, getParam)
    tmpResult = result.data
    labelsResult = labelsResult.concat(tmpResult)
    if (
      result.headers['x-next-page'] === '' ||
      result.headers['x-page'] === String(maxPage)
    ) {
      break
    }
    pageNum = result.headers['x-next-page']
  }
  return labelsResult
}
