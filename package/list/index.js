/**
 * Candice
 * 列表list
 * 2018/11/14
 */
import OcjList from './list.vue'

const components = [
  OcjList
]
const listInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default listInstall