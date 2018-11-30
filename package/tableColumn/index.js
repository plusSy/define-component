/**
 * Candice
 * 表格column
 * 2018/11/09
 */
import OcjTableColumn from './tableColumn.vue'

const components = [
  OcjTableColumn
]
const tableColumnInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default tableColumnInstall