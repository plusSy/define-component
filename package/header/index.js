/**
 * Candice
 *  顶部header
 * 2018/11/01
 */
import OcjHeader from './header.vue'

const components = [
  OcjHeader
]
const headerInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default headerInstall