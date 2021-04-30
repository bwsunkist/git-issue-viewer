/* eslint-disable camelcase */
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import * as config from '../batch/config.json'
import { fetchLabelListForTargetPj } from '~/batch/src/fetchLabelList'

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
   * バッチで取得し保存したJSONからラベル情報を取得します.
   */
  @Action({ rawError: true })
  public readLabelList() {
    const pjArray: Array<number> = config.PROJ_ID
    const pjId = pjArray[0]
    const repoName = `${pjId}_labels.json`
    try {
      const data = require(`../batch/output/${repoName}`)
      const json = data
      if (!json) return

      this.setLabelData(json)
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * API経由でラベル情報を取得します.
   * 数が多いと時間がかかるのでmaxPageを適切に設定すること.
   * @param maxPage 最大取得ページ数
   */
  @Action({ rawError: true })
  public async fetchLabelList(maxPage?: number) {
    const pjArray: Array<number> = config.PROJ_ID
    const pjId = pjArray[0]
    const labelList = await fetchLabelListForTargetPj(String(pjId), maxPage)
    this.setLabelData(labelList)
  }
}
