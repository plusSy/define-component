/**
 * Candice
 * 表格
 * 2018/11/08
 */
import OcjTable from './table.vue'

const components = [
  OcjTable
]
const tableInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default tableInstall