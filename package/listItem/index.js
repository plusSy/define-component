/**
 * Candice
 * 列表元素listItem
 * 2018/11/14
 */
import OcjListItem from './listItem.vue'

const components = [
  OcjListItem
]
const listItemInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default listItemInstall