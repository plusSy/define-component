/**
 * Candice
 * 2018/8/30
 */
import OcjHeadline from './headline'

const components = [
  OcjHeadline
]
const headlineInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default headlineInstall
