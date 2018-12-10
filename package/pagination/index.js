/**
 * Candice
 * 2018/12/7
 * 分页
 */
import OcjPagination from './pagination.vue'

const components = [
  OcjPagination
]
const paginationInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default paginationInstall