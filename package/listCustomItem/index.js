/**
 * Candice
 * 列表定制元素 一行两列listItem
 * 2018/11/14
 */
import OcjListCustomItem from './listCustomItem.vue'

const components = [
  OcjListCustomItem
]
const listCustomItemInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default listCustomItemInstall