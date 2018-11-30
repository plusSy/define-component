/**
 * Candice
 * 商品列表
 * 2018/9/6
 */
import OcjPdtList from './pdtList.vue'

const components = [
  OcjPdtList
]
const pdtListInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default pdtListInstall
