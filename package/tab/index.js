/**
 * Candice
 * 页签item
 * 2018/11/29
 */
import OcjTab from './tab.vue'

const components = [
  OcjTab
]
const tabInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default tabInstall