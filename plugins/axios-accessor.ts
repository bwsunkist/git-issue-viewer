import { Plugin } from '@nuxt/types'
import { getAxiosForGitlab, initializeAxios } from '~/utils/api'

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios)
  getAxiosForGitlab()
}

export default accessor
