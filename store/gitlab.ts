/* eslint-disable camelcase */
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import * as config from '../batch/config.json'
import { axiosGitlab } from '~/utils/api'

type LabelData = {
  labels: string[]
  open: number[]
  close: number[]
}
type GitlabLabels = {
  id: number
  name: string
  open_issues_count: number
  closed_issues_count: number
  color: string
}

@Module({
  name: 'gitlab',
  stateFactory: true,
  namespaced: true,
})
export default class Gitlab extends VuexModule {
  private labelData: LabelData = {
    labels: [],
    open: [],
    close: [],
  }

  public get getLabelData() {
    return this.labelData
  }

  @Mutation setLabelData(labels: GitlabLabels[]) {
    labels.forEach((label) => {
      if (label.open_issues_count > 0) {
        this.labelData.labels.push(label.name)
        this.labelData.open.push(label.open_issues_count)
        this.labelData.close.push(label.closed_issues_count)
      }
    })
  }

  /**
   * API経由でラベル情報を取得します.
   * 数が多いと時間がかかるのでmaxPageを適切に設定すること.
   * @param maxPage 最大取得ページ数
   */
  @Action({ rawError: true })
  public async fetchLabelList(maxPage?: number) {
    const pjArray: Array<number> = config.PROJ_ID
    let labelsResult = []
    await Promise.all(
      pjArray.map(async (pjId) => {
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
          const result = await axiosGitlab.get(`/${pjId}/labels`, getParam)
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
      })
    )
    this.setLabelData(labelsResult)
  }
}
