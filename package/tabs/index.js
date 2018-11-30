/**
 * Candice
 * 页签组件
 * 2018/11/01
 */
import OcjTabs from './tabs.vue'

const components = [
  OcjTabs
]
const tabsInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default tabsInstall