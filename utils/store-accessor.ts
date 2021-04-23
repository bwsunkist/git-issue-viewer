import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Gitlab from '~/store/gitlab'

// eslint-disable-next-line import/no-mutable-exports
let gitlabStore: Gitlab

function initialiseStores(store: Store<any>): void {
  gitlabStore = getModule(Gitlab, store)
}

export { initialiseStores, gitlabStore }
